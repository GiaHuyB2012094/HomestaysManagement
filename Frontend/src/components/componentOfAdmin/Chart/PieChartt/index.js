import classNames from "classnames/bind";
import style from './PieChartt.module.scss';
import {FiMoreVertical} from "react-icons/fi"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Tooltip } from "@mui/material";
const cx = classNames.bind(style);


function PieChartt({dataPieChart}) {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("top")}>
                <h3>Thống kê</h3>
                <FiMoreVertical></FiMoreVertical>
            </div>
            <div className={cx("bottom")}>
                <div className={cx("chart")}>
                    <ResponsiveContainer width="100%" height={250} >
                        <PieChart>
                            <Tooltip contentStyle={{background:"white", borderRadius:"5px"}}></Tooltip>
                            <Pie
                                data={dataPieChart}
                                innerRadius={"70%"}
                                outerRadius={"90%"}
                                paddingAngle={5}
                                dataKey="value"
                            >
                            {dataPieChart.map((item) => (
                                <Cell key={item.name} fill={item.color} />
                            ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className={cx("options")}>
                    {dataPieChart.map(item => (
                        <div className={cx("option")} key={item.name}>
                            <div className={cx("title")}>
                                <div className={cx("dot")} style={{backgroundColor: item.color}}></div>
                                <span>{item.name}</span>
                            </div>
                            <span className={cx("value")}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PieChartt;