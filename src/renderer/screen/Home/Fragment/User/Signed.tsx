import React, { FC, useReducer, useState, useRef, useEffect } from 'react';
import { localStore, AVATAR } from '@/utils';
import { ScrollBar, ClickDown, Avatar, RIcon } from '@/components';
import { Upload, Button } from 'antd';
import Cropper from 'react-cropper';
import { fullScreen } from '@/utils/css';
import ReactCropper from 'react-cropper';
import AV from 'leancloud-storage';
import './signed.css';

interface SignedProps {
  onLogout: () => void;
  userInfo?: AV.User;
}

const attachFileToUser = function() {
  console.log(111);
};

export const Signed: FC<SignedProps> = function(props) {
  const { userInfo, onLogout } = props;
  const { attributes } = userInfo!;
  const username = attributes.username;
  const [cropFilePath, setCropFilePath] = useState<string | null>(null);
  const cropperRef = useRef(null) as any;
  const avatar = localStore.get(AVATAR) === '' ? null : localStore.get(AVATAR);
  useEffect(() => {
    const a = AV.User.current();
    console.log(a);
  });

  return (
    <ScrollBar>
      <div
        style={{
          maxWidth: '800px',
          margin: '120px auto',
          background: 'var(--gl)',
          borderRadius: '5px'
        }}
      >
        {!!cropFilePath ? (
          <>
            <Cropper
              ref={cropperRef}
              src={cropFilePath}
              style={{ height: 400, width: '100%' }}
              // Cropper.js options
              preview=".img-preview"
              aspectRatio={1 / 1}
              guides={false}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="link"
                onClick={() => {
                  setCropFilePath(null);
                }}
              >
                取消
              </Button>
              <Button
                type="link"
                onClick={() => {
                  const cropper = cropperRef.current as ReactCropper;
                  const dataUrl = cropper.getCroppedCanvas()?.toDataURL();
                  localStore.set(AVATAR, dataUrl);
                  const data = { base64: dataUrl };
                  const img = new AV.File('avatar.png', data);
                  const currentUser = AV.User.current();
                  img.save().then(() => {
                    currentUser.add('attachments', img);
                    currentUser.save().then(() => {
                      console.log(111);
                    });
                  });
                  setCropFilePath(null);
                }}
              >
                确定
              </Button>
            </div>
          </>
        ) : null}
        <div
          style={{
            height: 160
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div
              className="avatar-container"
              style={{
                position: 'relative',
                width: 100,
                height: 100,
                marginTop: -60,
                borderRadius: 120,
                border: '10px solid #fff',
                boxSizing: 'unset',
                overflow: 'hidden'
              }}
            >
              <Avatar
                src={avatar}
                size={[100, 100]}
                fallback={require('../../../../assets/image/icon/user-line.svg')}
              />
              <Upload
                onChange={info => {
                  const picPath = (info.file.originFileObj as any).path as string;
                  setCropFilePath(picPath);
                }}
              >
                <div
                  className="avatar-mask"
                  style={{
                    position: 'absolute',
                    borderRadius: 120,
                    fontSize: 16,
                    color: '#fff',
                    ...fullScreen
                  }}
                >
                  <ClickDown>更换头像</ClickDown>
                </div>
              </Upload>
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              marginTop: '15px',
              fontSize: '16px'
            }}
          >
            <li>
              <span style={{ fontSize: 20, fontWeight: 'bold' }}>{username}</span>
            </li>
            <li>
              <span>邮箱</span>&nbsp;&nbsp;
              <span>{attributes.email}</span>&nbsp;
              <span style={{ fontSize: 10, color: 'var(--gg)' }}>
                {attributes.emailVerified ? '已验证' : '未验证'}
              </span>
            </li>
            <li>
              <Button
                type="link"
                onClick={() => {
                  AV.User.logOut();
                  onLogout();
                }}
              >
                退出登录
              </Button>
            </li>
          </div>
        </div>
      </div>
    </ScrollBar>
  );
};
