import Concert from './../Concert/Concert';


const Concerts = ({ concerts }) => ( //<=================dlaczego ( a nie { w Lineup jest odwrotnie
  <section>
    {concerts.map(con => <Concert key={con._id} {...con}/>)}
  </section>
)

export default Concerts;