import React, { FC, useState } from "react";
import MainButton from "../MainButton";
import { AutoComplete } from "antd";
import { RIcon } from "..";
import "./index.css";

const { Option } = AutoComplete;

function getRandomInt(max: any, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}
function searchResult(query: any) {
  return new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100)
    }));
}

function renderOption(item: any) {
  return (
    <Option key={item.category}>
      <div className="global-search-item">
        <span className="global-search-item-desc">
          {item.query}
          <a
            href={`https://s.taobao.com/search?q=${item.query}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.category}
          </a>
        </span>
        <span className="global-search-item-count">{item.count} results</span>
      </div>
    </Option>
  );
}

const Search: FC<any> = function(props) {
  // const { size, src, style } = props;
  const [width, setWidth] = useState("0px");
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [focus, setFocus] = useState(false);

  return (
    <div
      className="search-box"
      style={{
        position: "fixed",
        bottom: "25px",
        right: "85px",
        display: "inline-flex",
        alignItems: "flex-end"
      }}
    >
      <MainButton
        className="search-button"
        onClick={(button: HTMLButtonElement) => {
          setWidth("160px");
          setFocus(true);
        }}
      >
        <RIcon
          src={require("../../assets/search.svg")}
          size={[18, 18]}
          style={{
            transform: "translate(0px, 2px)"
          }}
        />
      </MainButton>
      <AutoComplete
        dataSource={dataSource.map(renderOption)}
        style={{ height: "40px", width }}
        onSearch={value => {
          setDataSource(value ? searchResult(value) : []);
        }}
        autoFocus={focus}
      >
        <input
          className="ant-input ant-select-search__field"
          placeholder="不可视境界线"
          onBlur={() => {
            setWidth("0px");
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default Search;
