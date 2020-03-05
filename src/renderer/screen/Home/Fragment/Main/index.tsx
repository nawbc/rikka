import React, { FC } from 'react';
import { ScrollBar, UpdateList, Card, CompanyMarquee } from '@/components';
import { useTitle, APP_MAIN_TITLE } from '@/utils';
import { createNews } from '@/api/gamersky';
import { Row, Col } from 'antd';

export const Main: FC = function() {
  useTitle(APP_MAIN_TITLE);

  return (
    <ScrollBar>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          marginTop: '40px',
          padding: '0 20px'
        }}
      >
        <Row>
          <Col span={16}>
            <button
              onClick={async () => {
                const a = await createNews({ page: 2 });
              }}
            >
              get
            </button>
          </Col>
          <Col span={8}>
            <div
              style={{
                position: 'relative',
                minHeight: '400px'
              }}
            >
              <UpdateList
                className="clean-float"
                style={{
                  width: 300,
                  height: 400,
                  display: 'inline-block',
                  float: 'right',
                  position: 'relative',
                  right: 60
                }}
              />
            </div>
          </Col>
        </Row>
        <CompanyMarquee
          style={{
            margin: '30px 0'
          }}
        />
        <div
          style={{
            width: '100%',
            margin: '20px 0  80px 0'
          }}
        >
          <Card />
        </div>
      </div>
    </ScrollBar>
  );
};
