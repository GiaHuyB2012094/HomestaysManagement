import classNames from "classnames/bind";
import style from './UpdateRoom.module.scss';
import { useEffect,useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';

import Button from "~/components/Button";
import useFetch from "~/Hook/useFetch";
// material ui
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Done from '@mui/icons-material/Done';
import Swal from "sweetalert2";
const cx = classNames.bind(style);

function UpdateRoom(props) {
    const [convenient, setConvenient] = useState([])
    const [nearbytouristspot, setNearbytouristspot] = useState(props.nearbyTouristSpot)
    const [branchval, setBranchVal] = useState(1)
    const [addressval, setAdressVal] = useState("")
    const [imgval, setImgval] = useState(props.roomdetail.imgs)
    const [room, setRoom] = useState([]);
    const [convenientRoomUpdated, setConvenientRoomUpdated] = useState(props.roomdetail.convenient)
    const [roomtype, setRoomtype] = useState(props.roomtype)
    const cancelHandle = () => {
        props.cancelUpdate(0);
        props.sendAllRoom(room);
    }    
   
    // get all convenients
      useEffect(()=>{
        const fetchDataConvenient = async() => {
          try {
             const newconvenient = (await axios.get('/api/convenient/getallconvenients')).data;
             setConvenient(newconvenient);
          } catch (error) {
           console.log(error);
          } 
        }
        fetchDataConvenient();
      },[])
      // get all near by tourist spots
      useEffect(()=>{
        const fetchDataNearbytouristspot = async() => {
          try {
             const newnearbytouristspot = (await axios.get('/api/nearbytouristspot/getallnearbytouristspots')).data;
             setNearbytouristspot(newnearbytouristspot);
          } catch (error) {
           console.log(error);
          } 
        }
        fetchDataNearbytouristspot();
      },[])
      // get all branchs
      useEffect(()=>{
        const fetchDataBranch = async() => {
          try {
             const newbranch = (await axios.get('/api/branch/getallbranchs')).data;
             setAdressVal(newbranch[0].address);
             setBranchVal(newbranch);
          } catch (error) {
           console.log(error);
          } 
        }
        fetchDataBranch();
      },[]);
      const addImgHandle = (e) => {
        e.preventDefault();
        setImgval([...imgval ,{src:"",alt:""}]);
      }
      // handle change img
      const imgHandleChangle = (e,i) =>{
          e.preventDefault();
          const {name,value} = e.target;
          const onChangeVal = [...imgval];
          onChangeVal[i][name] = value;
          setImgval(onChangeVal);
      }
      // handle delete img
      const deleteImgHandle = (i) =>{
          const deletaVal = [...imgval];
          deletaVal.splice(i,1);
          setImgval(deletaVal);
      }
      //  useForm
      const {register, handleSubmit, reset, formState ,getValues } = useForm({
      });
      // branch on change
      const BranchOnChange = () => {
        let result;
        const values = getValues("branch");
        branchval.forEach((branchEl) => {
          if (branchEl.branch === values) {
            setAdressVal(branchEl.address);
          }
        })
      }
    const onSubmit = async(data) => {
        Object.assign(data,{convenient: convenientRoomUpdated});
        Object.assign(data,{imgs: imgval});

        data.nearbyTouristSpot = []
        nearbytouristspot.forEach((spot)=>{
          if (parseInt(spot.branch) === data.branch) {
            (data.nearbyTouristSpot).push(spot)
          }
        })

        data.address = addressval;


        // 
        roomtype.forEach((roomtypeval) => {
          if (roomtypeval.codeRoomType.includes(data.type)) {
            data.price = roomtypeval.price;
            data.maxcount = roomtypeval.maxcount;
          }
        })
        
        try {
          const result = (await axios.put(`/api/rooms/updateroombyid/${props.roomdetail._id}`,data));
          await Swal.fire({
            icon: 'success',
            title: 'Cập nhật phòng thành công',
            text: 'Phòng đã được Cập nhật vào danh sách',
          })
        setRoom(result);
        } catch (error) {
          console.log(error)
        }
      };
  
    return ( 
      <>
        <div className={cx("title","flex")}> 
          <h2>Chỉnh sửa phòng</h2>
          <div className={cx("flex")}>
              <Button 
                    onClick={cancelHandle}
                    className={cx("btn",'cancelBtn')}
                    round
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit(onSubmit)}
                    className={cx("btn",'addBtn')}
                    round
                >
                    Save
                </Button>
          </div>
        </div>
        <div className={cx("body")}> 
          <form 
            key={2}
            onSubmit={handleSubmit(onSubmit)} 
            className={cx('form')}>
            <div className={cx("leftForm")}> 
              <div  className={cx('form-group')}>
                  <label htmlFor="name" className={cx('form-label')}>
                      Tên Phòng
                  </label>
                  <input
                      {...register("name", {
                        required: true,
                        value: props.roomdetail.name,
                        })} // react hook form
                      id="name"
                      name="name"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
              </div>
              <div className={cx('form-group')}>
                  <label htmlFor="address" className={cx('form-label')}>
                      Địa chỉ
                  </label>
                  <input
                      disabled
                      value={addressval}
                      id="address"
                      name="address"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
              </div>
              <div className={cx('form-group')}>
                  <label htmlFor="desc" className={cx('form-label')}>
                      Mô tả
                  </label>
                  <input
                      {...register("desc",{
                        required: true,
                        value: props.roomdetail.desc,
                        })}
                      id="desc"
                      name="desc"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <span className={cx('form-message')}></span>
              </div> 
              <Sheet  sx={{ width: "80%", marginBottom: 2}}>
                <Typography id="rank" level="body-sm" fontWeight="lg" sx={{ mb: 1.5, fontSize: 15, color: '#333' }}>
                  Tiện Nghi
                </Typography>
                <div role="group" aria-labelledby="rank">
                  <List
                    orientation="horizontal"
                    wrap
                    sx={{
                      '--List-gap': '8px',
                      '--ListItem-radius': '20px',
                      '--ListItem-minHeight': '32px',
                    }}
                  >
                    {convenient.map(
                      (item, index) => (
                        <ListItem key={index} sx={{fontSize: 15}}>
                          {convenient.includes(item.name) && (
                            <Done
                              fontSize="md"
                              color="primary"
                              sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: 'none' }}
                            />
                          )}
                          <Checkbox
                            {...register("convenient")}
                            size="sm"
                            sx={{fontSize: 12}}
                            disableIcon
                            overlay
                            label={item.name}
                            checked={convenientRoomUpdated.includes(item.name)}
                            variant={convenientRoomUpdated.includes(item.name) ? 'soft' : 'outlined'}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setConvenientRoomUpdated((val) => [...val, item.name]);
                              } else {
                                setConvenientRoomUpdated((val) => val.filter((text) => text !== item.name));
                              }
                            }}
                            slotProps={{
                              action: ({ checked }) => ({
                                sx: checked
                                  ? {
                                      border: '1px solid',
                                      borderColor: 'primary.500',
                                    }
                                  : {},
                              }),
                            }}
                          />
                        </ListItem>
                      ),
                    )}
                  </List>
                </div>
              </Sheet>
            </div>
            <div className={cx('rightForm')}>
                <div className={cx('selectFormDiv','flex')}>
                    <div className={cx('form-Input')}>
                        <label htmlFor="branch" className={cx('form-label')}>Chi nhánh</label>
                        <div className={cx('input')}>
                            <select 
                                {...register("branch",{
                                  value: props.roomdetail.branch,
                                  valueAsNumber: true,
                                  onChange: BranchOnChange})}
                                name="branch" 
                                id="input"
                                disabled
                                // onChange={BranchOnChange}
                                className={cx('form-control-right')}
                            >
                                <option value="1">chi nhánh 1</option>
                                <option value="2">chi nhánh 2</option>
                                <option value="3">chi nhánh 3</option>
                            </select>
                        </div>
                    </div>
                    {/* 2. type */}
                    <div className={cx('form-Input')}>
                        <label htmlFor="type" className={cx('form-label')}>
                            Loại
                        </label>
                        <div className={cx('input')}>
                            <select 
                                {...register("type",{value:props.roomdetail.type})}
                                name="type" 
                                id="input" 
                                className={cx('form-control-right')}
                            >
                                {roomtype.map((val,index) => {
                                  
                                  return <option key={index} value={val.codeRoomType}>{val.codeRoomType}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={cx('numberFormDiv','flex')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="acreage" className={cx('form-label')}>
                            Diện tích
                        </label>
                        <input
                            {...register("acreage",{
                              required: true,
                              min: 0,
                              valueAsNumber: true,
                              value:props.roomdetail.acreage,
                              })}
                            id="acreage"
                            name="acreage"
                            type="number"
                            className={cx('form-control-right')}
                        ></input>
                        <span className={cx('form-message')}></span>
                    </div>
                </div>
                <div className={cx("imgDiv")}>
                      <div className={cx("titleImg","flex")}>
                          <h4>Ảnh</h4>
                        <Button feature onClick={addImgHandle} className={cx('btn','addBtn')}>Add</Button>
                      </div>
                      { 
                        imgval.map((val,index)=>
                        <div key={index} className={cx("imgInput")}>
                            <p style={{paddingTop: 1, fontWeight: 'bold'}}>Hình {index+1}</p>
                            <input 
                              name="src" 
                              value={val.src} 
                              placeholder="Nhập link ảnh"
                              className={cx('form-img1')}
                              onChange={e=>{imgHandleChangle(e,index)}}>
                            </input>
                            <input 
                              name="alt" 
                              value={val.alt} 
                              placeholder="Nhập alt"
                              className={cx('form-img2')}
                              onChange={e=>{imgHandleChangle(e,index)}}>
                            </input>
                            <Button feature onClick={()=>deleteImgHandle(index)} className={cx("btn",'deleteBtn')}>Delete</Button>
                        </div>)
                      }
                </div>
            </div>
          </form>
        </div>
      </> 
    );
}

export default UpdateRoom;