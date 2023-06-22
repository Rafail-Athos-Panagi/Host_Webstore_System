import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Swal from 'sweetalert2';

export default function Homeimages() {
  const [data ,setData] = React.useState([]);
  const [dayhomeimage, setDayhomeimage] = React.useState(null);
  const [nighthomeimage, setNighthomeimage] = React.useState(null);

  const refreshData = () => {
    fetch("config/config.json").then((res) => res.json()).then((data) =>setData(data));
  }

  React.useEffect(() => {
    refreshData();
  }, []);
  

  const saveDayImage = (e) => {
    e.preventDefault();
    console.log(dayhomeimage.name);
    const formData = new FormData();
    formData.append("image", dayhomeimage);
    formData.set("time", "dayhomeimage");
    formData.set("imagename", dayhomeimage.name);

    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: formData,
    };

    fetch("/api/json/image", options).then(res => {
      if(res.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Image Changed',
          text: 'Image has been changed successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });

  }

  const saveNightImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", nighthomeimage);
    formData.set("time", "nighthomeimage");
    formData.set("imagename", nighthomeimage.name);

    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: formData,
    };

    fetch("/api/json/image", options).then(res => {
      if(res.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Image Changed',
          text: 'Image has been changed successfully',
        });
        refreshData();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });

  }

  return (
    <div className="d-flex justify-content-around">
      <Card style={{width:'25rem'}}>
        <Card.Img variant="top" src={'home/'+data.dayhomeimage}/>
        
        <Card.Body>
        <Card.Title className="text-center">Day image</Card.Title>
        <label htmlFor="formFileLg" className="form-label">Change Day Image</label>
        <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={(e)=>setDayhomeimage(e.target.files[0])}/>
        {dayhomeimage ? <Button id="savenight" className="mt-3" variant="primary" onClick={saveDayImage}>Save Changes</Button> : null}
        </Card.Body>
      </Card>
      <div className="me-5 d-none d-md-block"></div>
      <Card style={{width:'25rem'}}>
        <Card.Img variant="top" src={'home/'+data.nighthomeimage}/>
        
        <Card.Body>
        <Card.Title className="text-center">Night image</Card.Title>
        <label htmlFor="formFileLg" className="form-label">Change Night Image</label>
        <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={(e)=>setNighthomeimage(e.target.files[0])}/>
        {nighthomeimage ? <Button id="savenight" className="mt-3" variant="primary" onClick={saveNightImage}>Save Changes</Button> : null}
        </Card.Body>
      </Card>
    </div>
  )
}
