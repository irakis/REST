import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, getRequests, loadSeatsRequest } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {

  // eslint-disable-next-line 
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io.connect((process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:8000', {
      transports: ['websocket']
    });
    setSocket(socket);  
    socket.on('updateSeatsNow', () => { dispatch(loadSeatsRequest()) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seats = useSelector(getSeats);

  const takenSeatsByDay = seats.filter(seats => seats.day === chosenDay);
  const seatsAmount = takenSeatsByDay.length;
  const requests = useSelector(getRequests);



  const isTaken = (seatId) => {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if (isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
      <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i + 1))}</div>}
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} />}
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert>}
      <p className="mt-3 text-center info">Free seats {50 - parseInt(`${seatsAmount}`, 10) + '/ 50'}</p>
    </div>
  )
}

export default SeatChooser;