import moment from 'moment';
import Agenda from '../config';

import { JOB_STATES } from '../helpers/utils';

import Orders from '../../models/orders';
import DashboardStats from '../../models/dashboard-stats';
import Products from '../../models/products';

Agenda.define('create-dashboard-stats', { concurrency: 1 }, async (job, done) => {
  console.log('*********************************************************');
  console.log('*********  Create Dashboard Stats Job Started   *********');
  console.log('*********************************************************');

  job.attrs.state = JOB_STATES.STARTED;
  job.attrs.progress = 0;
  await job.save();

  const { type } = job.attrs.data;
  console.log('\n\n', { type });

  try {
    job.attrs.state = JOB_STATES.IN_PROGRESS;
    job.attrs.progress = 25;
    await job.save();

    let startDate = moment().startOf('day').toDate();
    let endDate = moment().endOf('day').toDate();

    const todayStats = await Orders.aggregate([{
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    }, {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalProducts: { $sum: { $size: '$productDetails' } },
        totalUnits: { $sum: { $sum: '$productDetails.quantity' } },
        totalSales: { $sum: '$amount' }
      }
    }]);

    console.log('\n\n', { todayStats });

    job.attrs.progress = 50;
    await job.save();

    startDate = moment().subtract(7, 'days').toDate();
    const sevenDayStats = await Orders.aggregate([{
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    }, {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalProducts: { $sum: { $size: '$productDetails' } },
        totalUnits: { $sum: { $sum: '$productDetails.quantity' } },
        totalSales: { $sum: '$amount' }
      }
    }]);
    console.log('\n\n', { sevenDayStats });

    job.attrs.progress = 75;
    await job.save();

    startDate = moment().subtract(31, 'days').toDate();
    const thirtyDayStats = await Orders.aggregate([{
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    }, {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalProducts: { $sum: { $size: '$productDetails' } },
        totalUnits: { $sum: { $sum: '$productDetails.quantity' } },
        totalSales: { $sum: '$amount' }
      }
    }]);
    console.log('\n\n', { thirtyDayStats });
    
    const ordersPaid = (await Orders.find({ status: 'Paid' })).length;
    const ordersUnPaid = (await Orders.find({ status: 'Unpaid' })).length;
    const topSellingOrders = (await Products.find().sort({ sold: -1 }).limit(7));

    const statsByMonth = [];
    const year = 2023;
    for (let month = 1; month <= 12; month++) {
      startDate = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);

      const orders = await Orders.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalSales: { $sum: { $round: ['$amount', 2] } }
          }
        }
      ]);

      if (orders.length > 0) {
        const { totalOrders, totalSales } = orders[0];
        statsByMonth.push({
          month,
          totalOrders,
          totalSales
        });
      } else {
        statsByMonth.push({
          month,
          totalOrders: 0,
          totalSales: 0
        });
      }
    }
    console.log('ORDERS PAID:', ordersPaid,'ORDERS UN-PAID:', ordersUnPaid);

    const newData = {
      todayStats,
      sevenDayStats,
      thirtyDayStats,
      ordersPaid,
      ordersUnPaid,
      topSellingOrders,
      statsOfYear: statsByMonth
    };

    await DashboardStats.updateOne({}, newData, { upsert: true });

    job.attrs.lockedAt = null;
    job.attrs.state = JOB_STATES.COMPLETED;
    job.attrs.progress = 100;
    await job.save();

    console.log('*********************************************************');
    console.log('********  Create Dashboard Stats Job Completed   ********');
    console.log('*********************************************************');
  } catch (error) {
    console.log('*********************************************************');
    console.log('***********  Create Dashboard Stats Job Retry  **********');
    console.log('*********************************************************');
    console.log(error.message);
    console.log('*********************************************************');

    job.attrs.state = JOB_STATES.FAILED;
    job.attrs.failedAt = new Date();
    job.attrs.failReason = error.message;

    await job.save();
  }

  done();
});
