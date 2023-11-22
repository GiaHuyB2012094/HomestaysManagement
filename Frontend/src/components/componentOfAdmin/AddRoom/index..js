import classNames from "classnames/bind";
import style from './AddRoom.module.scss';
import { useEffect,useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';

import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
// material ui
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Done from '@mui/icons-material/Done';
import Swal from "sweetalert2";
const cx = classNames.bind(style);

function AddRoom(props) {
    const [valueConvenient, setValueConvenient] = useState([])
    const [room, setRoom] = useState([]);
    const [convenient, setConvenient] = useState([])
    const [nearbytouristspot, setNearbytouristspot] = useState([])
    const [brachval, setBranchVal] = useState([])
    const [addressval, setAdressVal] = useState("")
    const [imgval, setImgval] = useState([{src:"",alt:""}])

    const [roomtype, setRoomtype] = useState(props.roomtype)
    const cancelHandle = () => {
        props.sendData(0);
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
      const {register, 
        handleSubmit, 
        reset, 
        formState: { errors,isSubmitSuccessful },
        getValues 
      } = useForm({
        defaultValues:{
          name :"",
          address:"",
          desc: "",
          branch: 1,
          acreage: 0,
          type: props.roomtype[0].codeRoomType,
        }
      });
      // branch on change
      const BranchOnChange = () => {
        let result;
        const values = getValues("branch");
        brachval.forEach((branchEl, index) => {
          if (branchEl.branch === values) {
            setAdressVal(branchEl.address);
          }
        })
      }
      const onSubmit = async(data) => {
        Object.assign(data,{convenient: valueConvenient});
        Object.assign(data,{imgs: imgval});
        data.nearbyTouristSpot = []
        nearbytouristspot.forEach((spot)=>{
          if (parseInt(spot.branch) === data.branch) {
            (data.nearbyTouristSpot).push(spot)
          }
        })
        data.address = addressval;
        roomtype.forEach((roomtypeval) => {
          if (roomtypeval.codeRoomType.includes(data.type)) {
            data.price = roomtypeval.price;
            data.maxcount = roomtypeval.maxcount;
          }
        })

        console.log(data);

        try {
          const result = (await axios.post("/api/rooms/addroom",data));
          if (result) {
            await Swal.fire({
            icon: 'success',
            title: 'Thêm phòng thành công',
            text: 'Phòng mới đã được thêm vào danh sách',
          })
          setRoom(result);}
        } catch (error) {
          console.log(error)
        }
      };
      useEffect(()=>{
        if (isSubmitSuccessful) {
          reset({
            name :"",
            address:"",
            desc: "",
            branch: 1,
            acreage: 0,
            type:roomtype[0].codeRoomType,
          })
          setValueConvenient([]);
          setImgval([{src:"",alt:""}]);
        }
      },[isSubmitSuccessful,reset])

    return (
        <>
        <div className={cx("title","flex")}> 
          <h2>Thêm Phòng</h2>
          <div className={cx("flex")}>
              <Button 
                    onClick={cancelHandle}
                    feature
                    className={cx("btn","cancelBtn")}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit(onSubmit)}
                    feature
                    className={cx("btn","addBtn")}
                >
                    Add
                </Button>
          </div>
        </div>
        <div className={cx("body")}> 
          <form 
            key={1}
            onSubmit={handleSubmit(onSubmit)} 
            className={cx('form')}>
            {/* LEFT FORM ------------------------------------------------------------------------------------ */}
            <div className={cx("leftForm")}> 
            {/* 1. title name */}
              <div  className={cx('form-group')}>
                  <label htmlFor="name" className={cx('form-label')}>
                      Tên Phòng
                  </label>
                  <input
                      {...register("name", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ tên phòng"
                        },
                        value:""})} // react hook form
                      id="name"
                      name="name"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.name && (
                          <span className={cx("error")}>{errors.name.message}</span>
                      )}
                  </div>
              </div>
            {/* 2. address */}
              <div className={cx('form-group')}>
                  <label htmlFor="address" className={cx('form-label')}>
                      Địa chỉ
                  </label>
                  <input
                      value={addressval}
                      disabled
                      id="address"
                      name="address"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
              </div>
            {/* 3. desc */}
              <div className={cx('form-group')}>
                  <label htmlFor="desc" className={cx('form-label')}>
                      Mô tả
                  </label>
                  <input
                      {...register("desc",{
                        required: {
                          value: true,
                          message:"Trường mô tả không được trống"
                        },
                        value:""})}
                      id="desc"
                      name="desc"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.desc && (
                          <span className={cx("error")}>{errors.desc.message}</span>
                      )}
                  </div>
              </div> 
            {/* 4. convinent */}
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
                          {valueConvenient.includes(item.name) && (
                            <Done
                              fontSize="md"
                              color="primary"
                              sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: 'none' }}
                            />
                          )}
                
                          <Checkbox
                            {...register("convenient")}
                            size="sm"
                            // disabled={index === 0}
                            sx={{fontSize: 12}}
                            disableIcon
                            overlay
                            label={item.name}
                            checked={valueConvenient.includes(item.name)}
                            variant={valueConvenient.includes(item.name) ? 'soft' : 'outlined'}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setValueConvenient((val) => [...val, item.name]);

                              } else {
                                setValueConvenient((val) => val.filter((text) => text !== item.name));
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
            {/* RIGHT FORM ------------------------------------------------------------------------------------ */}
            <div className={cx('rightForm')}>
            {/* Select form */}
                <div className={cx('selectFormDiv','flex')}>
            {/* 1. branch */}
                    <div className={cx('form-Input')}>
                        <label htmlFor="branch" className={cx('form-label')}>Chi nhánh</label>
                        <div className={cx('input')}>
                            <select 
                                {...register("branch",{value:1,valueAsNumber: true,onChange: BranchOnChange})}
                                name="branch" 
                                id="input" 
                                // onChange={BranchOnChange}
                                className={cx('form-control-right')}
                            >
                              {(brachval) && (
                              brachval.map((branchE,i)=>(
                                <option 
                                  key={i} 
                                  value={branchE.branch}
                                >
                                    chi nhánh {branchE.branch}
                                </option>)
                              ))}
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
                                {...register("type")}
                                name="type" 
                                id="input" 
                                className={cx('form-control-right')}
                            >
                                {(roomtype) && (
                                    roomtype.map((val,index) => (
                                      <option 
                                        key={index} 
                                        value={val.codeRoomType}
                                      >
                                            {val.codeRoomType}
                                      </option>
                                    )))
                                }
                            </select>
                        </div>
                    </div>
                </div>
            {/* Number form */}
               <div className={cx('numberFormDiv','flex')}>
            {/* 3. acreage */}
                    <div className={cx('form-group')}>
                        <label htmlFor="acreage" className={cx('form-label')}>
                            Diện tích
                        </label>
                        <input
                            {...register("acreage",{required: true,min: 0,value:1, valueAsNumber: true})}
                            id="acreage"
                            name="acreage"
                            type="number"
                            className={cx('form-control-right')}
                        ></input>
                        <span className={cx('form-message')}></span>
                    </div>
               </div>
            {/* 8. image */}
                <div className={cx("imgDiv")}>
                      <div className={cx("titleImg","flex")}>
                         <h4>Ảnh</h4>
                       <Button 
                        feature 
                        onClick={addImgHandle} 
                        className={cx('btn','addBtn')}>
                          Add
                        </Button>
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
                            <Button 
                              feature 
                              onClick={()=>deleteImgHandle(index)} 
                              className={cx('btn','deleteBtn')}>Delete</Button>
                        </div>)
                      }
                </div>
            </div>
          </form>
        </div>
      </>
     );
}

export default AddRoom;