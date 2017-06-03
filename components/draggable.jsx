const DOM = React.DOM;

const SomeImage = (props) => (
  DOM.img({
    src: 'http://fotointeres.ru/wp-content/uploads/2016/09/0003a709_medium-720x479.jpg',
    style: {
      width: 200,
      height: 150
    }
  })
);

class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        left: 0,
        top: 0,
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
    e.preventDefault();
    e.stopPropagation();

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
          left: this.state.position.left,
          top: this.state.position.top,
          cursor: 'move'
        },
        onMouseDown:  this.dragStart.bind(this),
        onMouseMove: this.drag.bind(this),
        onMouseUp: this.dragEnd.bind(this),
      },
      React.createElement(this.props.children)
    )
  }
}

ReactDOM.render(
  React.createElement(Draggable, {}, SomeImage),
  document.getElementById('app')
);


