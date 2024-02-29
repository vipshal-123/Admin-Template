import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';

const MultipleFileUpload = (props) => {
  const {setOpen, getData} = props;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async() => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`excelFile`, file);
      });
      try {
        await axios.post(`https://hrm-backend-7n1d.onrender.com/api/v1/attendance/postattendance`,formData)
        setOpen(false);
        getData();
      } catch (error) {
        console.error('error: ', error);
      }
    } else {
      console.error('No files selected');
    }
  };

  return (
    <>
    <Box p={3} textAlign="center">
      <input
        type="file"
        accept="xlsx/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="multiple-file-input"
      />
      <label htmlFor="multiple-file-input">
        <Button variant="outlined" component="span">
          Select Files
        </Button>
      </label>
     
    </Box>
    <Box>
    {selectedFiles.length > 0 && (
        <div>
          <Typography variant="subtitle1" mt={2}>
            Selected Files:
          </Typography>
          <Grid container alignItems={"center"} justifyContent={"space-between"}>
            <Grid>
            {selectedFiles.map((file) => (
              <Typography key={file.name}>{file.name}</Typography>
            ))}
            </Grid>
            <Grid>
          <Button variant="contained" color="primary" onClick={handleUpload} mt={2}>
            Upload
          </Button>
          </Grid>
          </Grid>
        </div>
      )}
    </Box>
    </>
  );
};

export default MultipleFileUpload;