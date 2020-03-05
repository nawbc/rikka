import React, { FC } from 'react';
import { ScrollBar } from '@/components';
import { useTitle } from '@/utils';

const SearchResult: FC<any> = function(props) {
  const { match } = props;

  useTitle('搜索结果');

  return (
    <div>
      <ScrollBar>aaaa</ScrollBar>
    </div>
  );
};

export default SearchResult;
