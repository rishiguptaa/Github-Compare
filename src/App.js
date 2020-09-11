import React , {  useState, useEffect } from 'react';
import './App.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined , SearchOutlined} from '@ant-design/icons';
function App() {

  const[name, setName] =  useState('');
  const[userName, setUsername] =  useState('');
  const[followers, setFollowers] =  useState('');
  const[avatar, setAvatar] =  useState('');
  const[input, setInput] =  useState('');
  const[repos, setRepos] =  useState('');
  const[following, setFollowing] =  useState('');
  const[error,setError] = useState('');

  useEffect(() => {
    fetch("https://api.github.com/users/rishiguptaa")
    .then(res => res.json())
    .then(data => {
        setDetails(data)
    });
  }, []);

  const setDetails = ({name, login, following, followers, public_repos, avatar_url}) => {
    setName(name);
    setUsername(login);
    setFollowing(following);
    setAvatar(avatar_url);
    setRepos(public_repos);
    setFollowers(followers);

  };

  const handleSearch = (event) => {
    setInput(event.target.value);
  }


  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${input}`)
    .then(res => res.json())
    .then(data => {
      if(data.message){
        setError(data.message)
      }
      else
      {
        setDetails(data);
        setError(null);
      }
    })
  }


  return (
    <div>
      <div className='header content1'>
        <h3>Github Compare</h3>
      </div>

    <Form className="search" name="horizontal_login" layout="inline" >
      <Form.Item
        name="username"
      >
        <Input placeholder="Username" value={input} onChange={handleSearch} />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
          >
            <SearchOutlined />
          </Button>
        )}
      </Form.Item>
    </Form>

        {error ? (<h1>{error}</h1>) : (<div className='card content'>
        <img src={avatar} style={{height:"200px"}} alt="profile-pic"></img>
        <ul className='details'>
          <br></br>
          <li className="name item"><h6><UserOutlined className="site-form-item-icon" /><b>{name}</b></h6></li>
          <li className="name item"><h6><b>{userName}</b></h6></li>
          <li className='followers item'><b>{followers} followers</b></li>
          <li className='following item'><b>{following} following</b></li>
          <li className='repos item'><b>{repos} Public repos</b></li>
          <li className='rank item'><b>{followers >=200 ?"Platinum" : followers> 100 ? "Gold" : followers>50 && followers<100 ? "Silver" : "Bronze"} Rank</b></li>
        </ul>
      </div>)}
      

    </div>
  );
}

export default App;
