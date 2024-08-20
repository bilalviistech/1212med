const Service = require('../model/ServiceModel')
const Appointment = require('../model/AppointmentModel')

class BookingController {

    static AddAppointment = async (req, res) => {
        const {
            service,
            firstName,
            lastName,
            email,
            phone,
            address,
            medicalReport,
            message,
            purpose,
            date,
            morningTime,
            eveningTime
        } = req.body;

        const [day, month, year] = date.split("-");
        const dateObject = new Date(`${year}-${month}-${day}`); 

        try {
            const newService = new Service({
                service,
                firstName,
                lastName,
                email,
                phone,
                address,
                medicalReport,
                message,
                purpose
            });
            await newService.save()

            if (newService.purpose === "Appointment") {
                const newAppointment = new Appointment({
                    serviceId: newService._id,
                    purpose,
                    date: dateObject,
                    // date: date,
                    morningTime,
                    eveningTime
                });

                newAppointment.save()
                .then(()=>{
                    res.status(200).json({
                        success: true,
                        message: 'Service and appointment saved successfully.'
                    });
                }).catch(async(err)=>{
                    await Service.findOneAndDelete({_id: newService._id})

                    res.status(200).json({
                        success: false,
                        message: err.message,
                        ero: "catch"
                    });
                })
            }
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            });
        }

    };

}

module.exports = BookingController