import { useEffect, useState } from 'react'
import MyBtn from '../../../components/MyBtn'
import MyInput from '../../../components/MyInput'
import MySelect from '../../../components/MySelect'
import SettingItemHeader from '../../../components/SettingItemHeader'
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { changeHandler } from '../../Login'
import CreateIcon from '@mui/icons-material/Create';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom'
import { message } from '../../../MSG'
import acat from '../../../requests'
import MenuIcon from '@mui/icons-material/Menu';
import DropdownMenu, { ListItem } from '../../../components/DropdownMenu'
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material'
import debounce from '../../../funcs/debounce'
let clickHandler: (...args: any[]) => void = () => undefined;

export default function FinishInfo() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
  const { userid, email } = userInfo ?? {};
  const [name, setName] = useState<string>(userInfo?.name);
  const [gender, setGender] = useState<boolean>(userInfo?.gender);
  const [major, setMajor] = useState<string>(userInfo?.major);
  const [phone, setPhone] = useState<string>(userInfo?.phone);
  const navigate = useNavigate();
  useEffect(() => {
    clickHandler = debounce(UpdateInfo);
    return () => { }
  }, [])
  return (
    <div>
      <SettingItemHeader
        label={(
          <div className='backlog'>
            <DropdownMenu
              size='small'
              lists={
                [{
                  content: (
                    (<ListItem
                      icon={LogoutIcon}
                      label='Log Out'
                    />)
                  ),
                  onClick: () => {
                    navigate('/');
                    localStorage.removeItem('access_token');
                  }
                }]
              }
            >
              <IconButton sx={{ ml: -1 }}>
                <MenuIcon />
              </IconButton>
            </DropdownMenu>
            ????????????
          </div>)}
        suffix={(
          <div
            onClick={() => { navigate('/ChangePass') }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <KeyIcon sx={{ color: 'primary.main', mr: 1, fontSize: '16px' }} />
            ????????????
          </div>
        )}
      />


      <MyInput label='??????' name='real-name' onChange={changeHandler(setName)} value={name} />
      <MySelect
        label='??????'
        items={[
          {
            value: true,
            label: (<div className='sex'>
              <MaleIcon sx={{ color: 'primary.main', mr: 5 }} /> ???
            </div >
            ),
          },
          {
            value: false,
            label: (<div className='sex'>
              <FemaleIcon sx={{ color: 'pink', mr: 5 }} /> ???
            </div >)
          }
        ]}
        onChange={changeHandler(setGender)}
        value={gender}
      />
      <SettingItemHeader label='????????????' />
      <MyInput label='????????????' name='major' value={major} onChange={changeHandler(setMajor)} />
      <MyInput label='??????' name='stuid' value={userid} disabled />
      <SettingItemHeader label='????????????' />
      <MyInput label='??????' name='phone-number' value={phone} onChange={changeHandler(setPhone)} />
      <MyInput label='??????' name='email' value={email} disabled suffix={(<CreateIcon onClick={() => navigate('../ChangeMail')} sx={{ fontSize: '1rem' }} />)} />
      <MyBtn
        type='contained'
        onClick={
          () => clickHandler({
            userid,
            name,
            gender,
            major,
            phone
          })
        }>??????</MyBtn>
    </div>
  )
}

type Props = {
  userid: string,
  name: string,
  gender: boolean,
  major: string,
  phone: string,
}

function UpdateInfo(props: Props) {
  // ????????????????????????
  const userInfo: Props = JSON.parse(localStorage.getItem('userInfo') as string);
  let changePropNum = 0;
  // ??????
  let key: keyof Props;
  for (key in props) {
    if (props[key] === undefined) {
      return message.default('???????????????');
    }
    if (props[key] !== userInfo[key]) {
      changePropNum++;
    }
  }
  if (!changePropNum) {
    return message.default('????????????');
  }

  return acat.updateInf({
    data: props
  }).then(() => {
    let { msg, code, data } = acat.getData('updateInf');
    if (!code) {
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('isComplete', String(data.complete));
    }
    code ? message.error(msg) : message.success(msg);
    throw msg
  })
}