export default class Form extends React.Component {
  render() {
    return <React.Fragment>
      <form>
        <label>名字：<input type="text" name="name" /></label>
        <input type="button" value="提交"/>
      </form>
    </React.Fragment>
  }
}