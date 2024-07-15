import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    // treatment is just another name of appointmentOptions with name, slots, _id
    const {_id, name, slots} = treatment;
    const [user, loading, error] = useAuthState(auth);

    const formattedDate = format(selectedDate, 'PP');


    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // [3, 4, 5].map((value, i) => console.log(value))
        const booking = {
            treatmentId : _id,
            treatment : name,
            date : formattedDate,
            slot,
            patientName : user.displayName,
            phone : event.target.phone.value,
        }


        fetch('http://localhost:5000/booking',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify('booking')
        }) 
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setTreatment(null);
        })

        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast
        // console.log(booking);
        // setTreatment(null);
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={formattedDate} className="input w-full input-bordered " />
                        <select name="slot" className="select select-bordered w-full">
                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name="name" type="text" disabled value={user?.displayName || ""} className="input w-full input-bordered" />
                        <input name="email" type="email" disabled value={user?.email || ""} className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;