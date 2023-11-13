import classNames from "classnames/bind";
import style from './BarChartt.module.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
    {
      name: 'Khách hàng',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Đơn đặt phòng',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Phòng',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Doanh thu',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    }
  ];
const cx = classNames.bind(style);
function BarChartt() {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                <h3>Earning</h3>
            </div>
            <div className={cx("charts")}>
            <BarChart width={300} height={290} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
            </div>
        </div>
     );
}

export default BarChartt;