const DOM = React.DOM;

class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        left: 50,
        top: 50,
      },
      innerOffset: {
        left: 0,
        top: 0
      },
      isDragging: false
    };
  }

  dragStart(e) {
    this.setState({
      isDragging: true,
      innerOffset: {
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY
      }
    });
  }

  dragEnd(e) {
    this.setState({ isDragging: false });
  }

  drag(e) {
    if(!this.state.isDragging) return;

    this.setState({
      position: {
        left: e.pageX - this.state.innerOffset.left,
        top: e.pageY - this.state.innerOffset.top
      }
    });
  }

  render() {
    return DOM.div(
      {
        style: {
          position: 'absolute',
          border: '2px solid black',
          width: 100,
          height: 100,
          left: this.state.position.left,
          top: this.state.position.top,
          textAlign: 'center',
          cursor: 'move'
        },
        onMouseDown:  this.dragStart.bind(this),
        onMouseMove: this.drag.bind(this),
        onMouseUp: this.dragEnd.bind(this),
      },
      this.props.children
    )
  }
}

ReactDOM.render(
  React.createElement(Draggable, {}, 'Draggable'),
  document.getElementById('app')
);


