import {View} from "@tarojs/components";
import { AtLoadMore} from 'taro-ui';
import Taro, { useEffect, useLayoutEffect, useReducer, useState, useRef, useCallback, useMemo, Component } from '@tarojs/taro'
import { getTopicList } from '@/api/topic_api'
import TopicList from './topic-list'

import './topic-list.module.scss'

function HookTopicList () {
  const [ loading, setLoading ] = useState(true)
  const [ topicList, setTopicList ] = useState([])
  const [ meta, setMeta ] = useState({})

  useEffect(async () => {
    try {
      const res = await getTopicList()
      setLoading(false)
      setTopicList(res.topics)
      setMeta(res.meta)
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误'
      })
    }
  }, [])

  return (
    <View className='index'>
      <TopicList
        topicList={topicList}
      />

      { loading && <AtLoadMore status="loading" /> }
    </View>
  )
}

export default HookTopicList
