import React, { FC, useState, useRef } from 'react';
import MainButton from '../MainButton';
import { AutoComplete } from 'antd';
import { RIcon } from '..';
import { createSearch } from '@/api/halihali';
import { SearchListData } from '@/api/halihali/halihali.interface';
import { remote, ipcRenderer } from 'electron';
const { Option } = AutoComplete as any;
import './index.css';

const dataToEleList = (data: SearchListData[]) =>
  data.map((item, index) => (
    <Option key={index} text={item.title}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            width: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {item.title}
        </span>
        <RIcon size={[16, 16]} src={require('../../assets/image/icon/play.svg')} />
      </div>
    </Option>
  ));

const Search: FC<any> = function(props) {
  const [width, setWidth] = useState('0px');
  const [dataSource, setDataSource] = useState<SearchListData[]>([]);
  const [display, setMaskDisplay] = useState(false);
  const [searchTarget, setSearchTarget] = useState('');

  return (
    <>
      {display ? (
        <div
          className="full-box"
          onClick={() => {
            setMaskDisplay(false);
            setWidth('0px');
          }}
        />
      ) : null}
      <div className="search-box">
        <MainButton
          className="search-button"
          onClick={() => {
            setMaskDisplay(true);
            setWidth('200px');
            if (width === '200px') {
            }
          }}
        >
          <RIcon
            src={require('../../assets/image/icon/search.svg')}
            size={[18, 18]}
            style={{
              transform: 'translate(0px, 2px)'
            }}
          />
        </MainButton>
        <AutoComplete
          dataSource={dataToEleList(dataSource)}
          style={{ height: 34, width }}
          optionLabelProp="text"
          // onSelect={v => {
          //   setSearchTarget(v);
          // }}
          onSearch={value => {
            createSearch(value).then(data => {
              setDataSource(!!data && data.length > 0 ? data : []);
            });
          }}
          dropdownMenuStyle={{
            maxHeight: 400
          }}
        >
          <input
            style={{ textIndent: 10 }}
            className="ant-input ant-select-search__field"
            placeholder="不可视境界线"
          />
        </AutoComplete>
      </div>
    </>
  );
};

export default Search;
