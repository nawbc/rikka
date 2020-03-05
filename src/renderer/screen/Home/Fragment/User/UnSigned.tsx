/**
 * design by
 * @author Florin Pop {@see https://codepen.io/FlorinPop17/pen/vPKWjd}
 */

import React, { FC, useState, useRef } from 'react';
import AV from 'leancloud-storage';
import { RIcon } from '@/components';
import { notification } from 'antd';
import { is } from '@/utils';
import './unsigned.css';

interface UnsignedProp {
  onLogin: (user: any) => void;
}

const localCheckSuitable = (email: string, passwd: string, username?: string) => {
  const isEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(email);
  if (!isEmail) {
    notification.open({
      message: '错误',
      description: '邮箱格式错误'
    });
    return false;
  }

  if (passwd.length < 8) {
    notification.open({
      message: '错误',
      description: '密码最少8位'
    });
    return false;
  }

  if (!!username && username.length < 4) {
    notification.open({
      message: '错误',
      description: '用户名最少4个字符'
    });
    return false;
  }

  return true;
};

const register = (email: string, passwd: string, username: string, ref?: any) => {
  const user = new AV.User();
  user.setUsername(username);
  user.setEmail(email);
  user.setPassword(passwd);

  user.signUp().then(
    user => {
      notification.open({
        message: '信息',
        description: '注册成功。' + user.id + '请前去邮箱验证账户权限',
        duration: 2
      });
      AV.User.requestEmailVerify(email).catch(() => {
        notification.open({
          message: '错误',
          description: '邮箱验证发送错误， 请重试'
        });
      });
      !!ref && ((ref.current as unknown) as HTMLElement).classList.remove('right-panel-active');
    },
    error => {
      notification.open({
        message: '错误',
        description: error.toString(),
        duration: 2
      });
    }
  );
};

const login = (email: string, passwd: string, callback: (user: AV.User) => void) => {
  AV.User.loginWithEmail(email, passwd)
    .then(user => {
      is.function(callback) && callback(user);
      notification.open({
        message: '信息',
        description: '登陆成功'
      });
    })
    .catch(error => {
      notification.open({
        message: '注意',
        description: error.toString(),
        duration: 2
      });
    });
};

export const UnSigned: FC<UnsignedProp> = function(props) {
  const { onLogin } = props;
  const ref = useRef(null);
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="unsigned">
      <div className="container" ref={ref}>
        <div className="form-container sign-up-container">
          <form>
            <h1>和漆黑火焰使缔结契约吧!</h1>
            <br />
            <br />
            <span>使用邮箱注册</span>
            <input
              type="text"
              placeholder="吾名"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="不可视境界线"
              value={passwd}
              onChange={e => {
                setPasswd(e.target.value);
              }}
            />
            <br />
            <br />
            <button
              onClick={e => {
                e.preventDefault();
                localCheckSuitable(email, passwd, username) &&
                  register(email, passwd, username, ref);
              }}
            >
              契约
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>与之产生共鸣</h1>
            <div className="social-container">
              <a
                href="javascript:void(0)"
                onClick={() => {
                  notification.open({
                    message: '注意',
                    description: '暂不支持'
                  });
                }}
              >
                <RIcon src={require('../../../../assets/image/icon/qq.svg')} size={[17, 17]} />
              </a>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  notification.open({
                    message: '注意',
                    description: '暂不支持'
                  });
                }}
              >
                <RIcon src={require('../../../../assets/image/icon/alipay.svg')} size={[17, 17]} />
              </a>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  notification.open({
                    message: '注意',
                    description: '暂不支持'
                  });
                }}
              >
                <RIcon src={require('../../../../assets/image/icon/github.svg')} size={[17, 17]} />
              </a>
            </div>
            <br />
            <span>使用自身账户</span>
            <input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="不可视境界线"
              value={passwd}
              onChange={e => {
                setPasswd(e.target.value);
              }}
            />
            <a href="#">忘记契约?</a>
            <button
              onClick={e => {
                e.preventDefault();
                if (localCheckSuitable(email, passwd)) {
                  login(email, passwd, onLogin);
                }
              }}
            >
              共鸣
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>邪王真眼!</h1>
              <p>是回到那无聊的现实中！还是和我一起改变那现实！</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  ((ref.current as unknown) as HTMLElement).classList.remove('right-panel-active');
                }}
              >
                放逐这个世界!
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>来, 签订契约吧!</h1>
              <p>被邪王真眼所选中的人啊 你是愿意与我签订契约, 还是在漆黑烈焰中燃烧殆尽</p>
              <button
                className="ghost"
                onClick={() => {
                  ((ref.current as unknown) as HTMLElement).classList.add('right-panel-active');
                }}
              >
                缔结契约
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
