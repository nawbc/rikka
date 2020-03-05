import React, { FC } from 'react';
import { ScrollBar, Card } from '@/components';
import { useTitle, useWindowResize, randomColor, RANDOM_COLOR } from '@/utils';
import companyWorks from '../../assets/company-works.json';
import { Tag, Tooltip } from 'antd';
import { fullOutScreen, fullScreen } from '@/utils/css';

const company = companyWorks as any;

const CompanyResult: FC<any> = function(props) {
  const { match } = props;
  useTitle('结果');
  const name = match.params.name as any;
  const { width, height } = useWindowResize();
  const collections = Object.entries(company[name].result);

  return (
    <div style={{ width, height }}>
      <ScrollBar>
        <div style={{ margin: '50px 0' }}>
          {!!collections && collections.length !== 0
            ? collections.map((val: any, index: any) => {
                return (
                  <div key={index}>
                    <h1 style={{ paddingLeft: 50 }}>{val[0]}</h1>
                    <div>
                      {val[1].map((obj: any, i: number) => {
                        return (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0 50px',
                              marginBottom: 80,
                              boxShadow: '0px 0px 20px var(--gg)',
                              position: 'relative',
                              height: 250
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                overflow: 'hidden',
                                zIndex: -1,
                                ...fullScreen
                              }}
                            >
                              <div
                                style={{
                                  position: 'absolute',
                                  ...fullOutScreen,
                                  background: `url(${obj.cover}) no-repeat center/cover`,
                                  filter: 'blur(10px)  brightness(0.9)',
                                  backgroundPositionY: '22%'
                                }}
                              />
                            </div>
                            <div
                              style={{
                                width: '70%',
                                color: '#fff'
                              }}
                            >
                              <h2 style={{ color: '#fff' }}>{obj.name}</h2>
                              <p>{obj.stats}</p>
                              <p>{obj.year}</p>
                              <p>
                                {obj.kinds.map((val: string, i: number) => (
                                  <Tag color={randomColor(RANDOM_COLOR)} key={i}>
                                    {val}
                                  </Tag>
                                ))}
                              </p>
                              <Tooltip
                                title={obj.introduce}
                                mouseEnterDelay={0.5}
                                overlayStyle={{
                                  maxWidth: 700
                                }}
                              >
                                <li
                                  style={{
                                    fontSize: 14,
                                    height: 45,
                                    overflow: 'hidden'
                                  }}
                                >
                                  {obj.introduce}
                                </li>
                              </Tooltip>
                            </div>

                            <Card
                              imgSrc={obj.cover}
                              url={'/play' + obj.url + obj.name.replace('/', ' ')}
                              videoName={obj.name}
                              subTitle={obj.stats}
                              onImgLoadError={e => {
                                const errorTarget = e.target as HTMLImageElement;
                                errorTarget.src = require('../../assets/image/error_img.jpg');
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </ScrollBar>
    </div>
  );
};

export default CompanyResult;
