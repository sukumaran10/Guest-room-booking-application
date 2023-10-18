import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
  let { roomid,fromdate,todate } = useParams();

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [room, setroom] = useState(null);

 
  const firstdate = moment(fromdate, 'LL');
  const lastdate = moment(todate, 'LL');
  
const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1
const totalamount=room ? totaldays * room.rentperday : 0;
  

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data;
        setroom(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }
    fetchData();
  }, [roomid]);
  async function bookRoom() {
    const bookingDetails={ 
    room,
    userid:JSON.parse(localStorage.getItem('currentUser'))._id,
    fromdate,
    todate,
    totalamount,
    totaldays

    }
    try{
      const result=await axios.post('/api/bookings/bookroom',bookingDetails)
    }catch(error){

    }
    
  }



    return (
        <div className='m-5'>
            {loading ? (<h1><Loader/></h1>) : room ? (
            <div>
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-5">
                    <h1>{room.name}</h1>
                    <img src={room.imageurls[0]}className="bigimg"/>


                </div>
                <div className="col-md-5">
                <div style={{textAlign:'right'}}>
                    <h1>Booking Details</h1>
                    <hr/>
                    <b> 
                    <p>Name:</p>
                    <p style={{color:'violet'}}>From Date: {fromdate}</p>
                    <p style={{color:'violet'}}>  To   Date: {todate}</p>
                    <p>Max Count: {room.maxcount}</p>
                    </b>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <b>
                        <h1>Amount</h1>
                        <hr/>
                          <p>Total Days: {totaldays}</p>
                        <p>Rent per day: {room.rentperday}</p>
                        <p>Total Amount:{totalamount}</p>
                        </b>
                        </div>
                        
                        <div style={{float:'right'}}>
                            <button className='btn btn-primary'onClick={bookRoom}>Pay now</button>
                            </div>

                    
                    </div>
                </div>
                    
           
           
            </div>):(<Error/>)}
            </div>
                
                

                

            
        
    );

}
export default Bookingscreen
