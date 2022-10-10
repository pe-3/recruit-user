import qs, { ParsedQs } from 'qs';
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import $bus from '../../../bus';
import MyBtn from '../../../components/MyBtn'
import MySelect from '../../../components/MySelect';
import WishSelector from '../../../components/WishSelector'
import debounce from '../../../funcs/debounce';
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
  const [wish, setWish] = useState(userInfo?.wish === undefined ? 0 : userInfo.wish);
  const [stop, setStop] = useState(localStorage.getItem('isLock') === 'true');

  return (
    <div>
      <WishSelector stop={stop} wish={wish} />
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
          debounce(() => {
            setStop((stop) => !stop);
            if (stop) { return localStorage.removeItem('isLock'); }
            sendWish(wish);
            $bus.emit('reset-wish');
          })
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
      const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
      userInfo.wish = wish;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('isLock', 'true');
    } else {
      message.error(msg);
    }
  })
}
