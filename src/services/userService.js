import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  // axios này khi nãy mình search có nghĩa là nó là chổ để gọi CRUD API
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

export { handleLoginApi };
