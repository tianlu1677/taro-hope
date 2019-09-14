import Taro, {Component} from "@tarojs/taro";
import {View, Text} from "@tarojs/components";
import BaseSuggestion from '@/components/suggestion/base-suggestion'

class SuggestionList extends Component {

  static defaultProps = {
    suggestionList: []
  }


  componentDidMount() {

  }

  render() {
    const { suggestionList } = this.props
    return (<View>
        {
          suggestionList.map((sug) => {
            return <BaseSuggestion baseSuggestion={sug}/>
          })
        }
      </View>
    );
  }
}


export default SuggestionList;
