import { getSession, useSession } from 'next-auth/client';
import db from '../../firebase';
import Header from '../components/Header';
import moment from 'moment';

function orders({ orders }) {
  const [session] = useSession();
  console.log(orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? <h2>X Orders</h2> : <h2>Sign in to see your orders</h2>}
        <div>
          {orders?.map((order) => (
            <Order />
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const moment = require('moment');

  // Get the users login credentials...
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  // Firebase db
  const stripeOrders = await db
    .collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  // Stripe Orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      titles: order.data().title,
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    })),
  );

  return {
    props: {
      orders,
    },
  };
}
