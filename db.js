const { Sequelize, DataTypes, Deferrable } = require('sequelize');
const mining = require('./mining.js');
const sequelize = new Sequelize('postgres://cctpuete:zweCsEFIeMPCSRpreLSes6Y-UXt854gr@john.db.elephantsql.com:5432/cctpuete') // Example for postgres



const medical_speciality = sequelize.define('medical_specialities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
},
    {
        freezeTableName: true
    });



const doctor = sequelize.define('doctors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.TEXT
    },
    language: {
        type: DataTypes.STRING
    },
    rank: {
        type: DataTypes.INTEGER
    },
    has_appointment: {
        type: DataTypes.STRING
    },
    speciality_id: {
        type: DataTypes.INTEGER,

    },
    term_permalink: {
        type: DataTypes.TEXT
    },
    doctor_speciality: {
        type: DataTypes.STRING
    },
    qualification: {
        type: DataTypes.TEXT
    }
})

const working_hour = sequelize.define('working_hours', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    day: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.TEXT
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: doctor,
            key: 'id',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    },

})
const { medical_specialities, doctors } = mining.toModels();
console.log("=========================medical_speciality:")
console.log(medical_specialities[0]);
console.log("=========================doctors:")
console.log(doctors[0]);

console.log(medical_speciality === sequelize.models.medical_specialities)
console.log(doctor === sequelize.models.doctors)
console.log(working_hour === sequelize.models.working_hours)


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// asyncForEach(medical_specialities, async (s) => {
//     await medical_speciality.create(s);
// })

const doit = async () => {

    for await (const s of medical_specialities) {
        try {
            const result = medical_speciality.create(s);
            // you can now access the newly created user
            console.log('success', result.toJSON());
        } catch (err) {
            // print the error details
            console.log(err);
        }
    }
    for await (const d of doctors) {
        for await (const w of d.working_hours) {
            try {
                const result = working_hour.create({ ...w, doctor_id: d.id })
                // you can now access the newly created user
                console.log('success', result.toJSON());
            } catch (err) {
                // print the error details
                console.log(err);
            }

        }
        delete d.working_hours;
        d.speciality_id = medical_specialities.find(x => x.name === d.speciality).id
        delete d.speciality
        try {
            const result = doctor.create(d)
            // you can now access the newly created user
            console.log('success', result.toJSON());
        } catch (err) {
            // print the error details
            console.log(err);
        }

    }
}
doit();

console.log("done")
  // `sequelize.define` also returns the model
//   console.log(medical_speciality === sequelize.models.medical_speciality); // true
