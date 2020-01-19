import axios from 'axios';

class SecurityService {

  deleteSecurity(id) {
    axios.delete('http://localhost:8000/deleteSecurity/' + id)
    .then(() => {
      console.log('Security '+ id+ ' Deleted !!!')
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export default SecurityService;
