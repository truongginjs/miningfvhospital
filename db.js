const { Sequelize, DataTypes, Deferrable } = require('sequelize');
const mining = require('./mining.js');
const sequelize = new Sequelize('postgres://ivsnhdra:gyN4Z6OPzHvr6jp9ZsNLmYkfm2HkuM3f@john.db.elephantsql.com:5432/ivsnhdra') // Example for postgres



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
        references: {
            model: medical_speciality,
            key: 'id',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
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


medical_specialities.forEach(async s => {
    await medical_speciality.create(s);
})
// const d = doctors[0]
// const w = d.working_hours[0]
// working_hour.create({ ...w, doctor_id: d.id })

// delete d.working_hours;
// d.speciality_id = medical_specialities.find(x => x.name === d.speciality).id
// delete d.speciality
// doctor.create(d)


doctors.forEach(async d=>{
    d.working_hours.forEach(async w=>{
        await working_hour.create({...w,doctor_id: d.id})
    })
    delete d.working_hours;
    d.speciality_id=medical_specialities.find(x=>x.name===d.speciality).id
    delete d.speciality
    await doctor.create(d)
})



  // `sequelize.define` also returns the model
//   console.log(medical_speciality === sequelize.models.medical_speciality); // true
