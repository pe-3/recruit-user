import qs, { ParsedQs } from 'qs';
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import $bus from '../../../bus';
import Logo from '../../../components/Logo';
import MyBtn from '../../../components/MyBtn'
import MySelect from '../../../components/MySelect';
import SettingItemHeader from '../../../components/SettingItemHeader';
import WishSelector from '../../../components/WishSelector'
import { message } from '../../../MSG';
import acat from '../../../requests';
import { changeHandler } from '../../Login';

export default function SelectGroup() {
  // 判断是否 签到
  const location = useLocation();
  const searchstr: string = location.search;
  const search: ParsedQs = qs.parse(searchstr.slice(1));
  const { type } = search;
  if (type === 'sign') {
    acat.sign().then(() => {
      let { code, msg } = acat.getData('sign');
      code ? message.error(msg) : message.success(msg);
      if (!code) {
        localStorage.setItem('isSign', 'true')
      }
    })
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
  const [wish, setWish] = useState(userInfo.wish === undefined ? 0 : userInfo.wish);
  const [stop, setStop] = useState(false);
  return (
    <div>
      <SettingItemHeader label={(
        <div className='backlog'>
          <Logo size={32} mr='10px' />
          <span>很多时候选择大于努力</span>
        </div>
      )} />
      <WishSelector stop={stop} wish={wish} />
      <br />
      <MySelect
        label='选择方向'
        value={wish}
        disbaled={stop}
        items={[
          {
            value: 0,
            label: '暂无选择',
            disabled: true
          },
          {
            value: 1,
            label: '前端'
          },
          {
            value: 2,
            label: '后台JAVA'
          },
          {
            value: 3,
            label: '后台GO'
          },
          {
            value: 4,
            label: '机器学习'
          }
        ]
        }
        onChange={changeHandler(setWish)}
      />
      <MyBtn
        type={stop ? 'outlined' : 'contained'}
        onClick={
          () => {
            setStop((stop) => !stop);
            if (stop) { return; }
            sendWish(wish);
            $bus.emit('reset-wish');
          }
        }
      >{stop ? '再想想' : '就决定是这个方向了'}</MyBtn>
    </div>
  )
}


function sendWish(wish: number): void {
  acat.updateInf({
    data: {
      wish,
    }
  }).then(() => {
    let { code, msg } = acat.getData('updateInf');
    if (!code) {
      message.success(msg);
    } else {
      message.error(msg);
    }
  })
}
