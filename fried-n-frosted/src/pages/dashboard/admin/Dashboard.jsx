import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { FaBook, FaRupeeSign, FaShoppingBasket, FaUsers } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell, BarChart, Bar, } from 'recharts';

const Dashboard = () => {
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  const { refetch, data: stats= [] } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/adminStats');
      return res.data;
    }
  })

  const { data: orderData= [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/orderStats');
      return res.data;
    }
  })

  const { data: userData= [] } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/userStats');
      return res.data;
    }
  })

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const pieChartData = orderData.map((data) => {
  
  return {name: data.category, value: data.revenue}
})

const pieChartData1 = userData.map((data) => {
  
  return {name: data.email, value: data.orderCount}
})


  console.log(userData)
  return (
    <div className='w-full md:max-w-[870px] mx-auto px-4'>
      <h2 className='text-2xl font-semibold my-4'>Hi, {user.displayName}</h2>

      {/** stats */}
      <div className="stats stats-vertical w-full lg:stats-horizontal shadow">
  
  <div className="stat bg-emerald-300">
  
  <div className="stat-figure text-secondary text-3xl">
  <FaRupeeSign />
    </div>

    <div className="stat-title">Revenue</div>
    <div className="stat-value">₹ {stats.revenue / 100}</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  
  <div className="stat bg-rose-300">
  <div className="stat-figure text-secondary text-3xl">
  <FaUsers />
    </div>
    <div className="stat-title">Users</div>
    <div className="stat-value">{stats.users}</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  
  <div className="stat bg-indigo-300">
  <div className="stat-figure text-secondary text-3xl">
  <FaBook />
    </div>
    <div className="stat-title">Menu Items</div>
    <div className="stat-value">{stats.menuItems}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>

  <div className="stat bg-purple-300">
  <div className="stat-figure text-secondary text-3xl">
  <FaShoppingBasket />
    </div>
    <div className="stat-title">Orders</div>
    <div className="stat-value">{stats.orders}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
  
</div>
{/** charts and graph */}
      <div className='mt-16'>
        {/** user data chart */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 5 }}>
          <h2 className='font-semibold'>Popular Users</h2>
        <BarChart
      width={500}
      height={300}
      data={userData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="email" />
      <YAxis />
      <Bar dataKey="orderCount" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {userData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        </div>
        <div style={{ flex: 2, width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
        <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <Pie
            data={pieChartData1}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        </div>
        </div>
        {/**  order data chart */}
        <div>
          <h2 className='font-semibold'>Popular Orders</h2>
       <div style={{ display: 'flex', flexDirection: 'row' }}>
       <div style={{ flex: 5, width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={orderData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 2, width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
        <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        </div>
       </div>
        </div>

        {/** pie charts */}
        
      </div>
    </div>
  )
}

export default Dashboard
