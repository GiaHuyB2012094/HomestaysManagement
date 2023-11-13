import classNames from "classnames/bind";
import style from './ResponsiveContainerChart.module.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    {name: "January", Total: 1200},
    {name: "February", Total: 2100},
    {name: "March", Total: 800},
    {name: "April", Total: 1600},
    {name: "May", Total: 900},
    {name: "June", Total: 1700},
]
const cx = classNames.bind(style)
function ResponsiveContainerChart() {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                <h3>Last 6 Months (Revenue)</h3>
            </div>
            <div className={cx("chart")}>
                    <AreaChart width={500} height={290} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                           
                        </defs>
                        <XAxis dataKey="name" color="gray"/>
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                    </AreaChart>
            </div>
        </div>
     );
}

export default ResponsiveContainerChart;