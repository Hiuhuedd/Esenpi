import Link from "next/link"

async function getTickets() {
  const res = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 0 // use 0 to opt out of using cache
    }
  })

  return res.json()
}
const apps=[
  {
    userId:"Hiuhu",
    amount:"200",
    offers:{},
    discounts:{},
    newArrivals:{},
    tillNumber:4087480,
  },
]

export default async function TicketList() {
  // const tickets = await getTickets()

  return (
    <>
      {apps.map((app) => (
        <div key={app.userId} className="card my-5">
          <Link href={`/tickets/${app.userId}/${app.amount}`}>
            <h3>{app.amount}</h3>
            <p>{app.userId}...</p>
            {/* <div className={`pill ${ticket.priority}`}> */}
              {/* {ticket.priority} priority */}
            {/* </div> */}
          </Link>
        </div>
      ))}
      {apps.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  )
}