// // // // // alert('Hello, world!')
// // // // const theNumber = 1
// // // // let yourName = 'Ben'

// // // // if (theNumber === 1) {
// // // //   let yourName = 'Leo'
// // // //   alert(yourName)
// // // // }

// // // // // alert(yourName)

// // // class Greeter {
// // //   constructor (name) {
// // //     this.name = name
// // //   }

// // //   getGreeting () {
// // //     if (this.name === undefined) {
// // //       return 'Hello, no name'
// // //     }

// // //     return 'Hello, ' + this.name
// // //   }

// // //   showGreeting (greetingMessage) {
// // //     console.log(greetingMessage)
// // //   }

// // //   greet () {
// // //     this.showGreeting(this.getGreeting())
// // //   }
// // // }

// // // const g = new Greeter('Patchy')  // Put your name here if you like
// // // g.greet()

// // // class DelayedGreeter extends Greeter {
// // //   delay = 2000

// // //   constructor (name, delay) {
// // //     super(name)
// // //     if (delay !== undefined) {
// // //       this.delay = delay
// // //     }
// // //   }

// // //   greet () {
// // //     setTimeout(
// // //       () => {
// // //         this.showGreeting(this.getGreeting())
// // //       }, this.delay
// // //     )
// // //   }
// // // }

// // // const dg2 = new DelayedGreeter('Patchy 2 Seconds')
// // // dg2.greet()

// // // const dg1 = new DelayedGreeter('Patchy 1 Second', 1000)
// // // dg1.greet()

// // function resolvedCallback(data) {
// //   console.log('Resolved with data ' +  data)
// // }

// // function rejectedCallback(message) {
// //   console.log('Rejected with message ' + message)
// // }

// // const lazyAdd = function (a, b) {
// //   const doAdd = (resolve, reject) => {
// //     if (typeof a !== "number" || typeof b !== "number") {
// //       reject("a and b must both be numbers")
// //     } else {
// //       const sum = a + b
// //       resolve(sum)
// //     }
// //   }

// //   return new Promise(doAdd)
// // }

// // const p = lazyAdd(3, 4)
// // p.then(resolvedCallback, rejectedCallback)

// // lazyAdd("nan", "alsonan").then(resolvedCallback, rejectedCallback)

// class ClickButton extends React.Component {
//   state = {
//     wasClicked: false
//   }

//   handleClick () {
//     this.setState(
//       {wasClicked: true}
//     )
//   }

//   render () {
//     let buttonText

//     if (this.state.wasClicked)
//       buttonText = 'Clicked!'
//     else
//       buttonText = 'Click Me'

//     return <button
//       className="btn btn-primary mt-2"
//       onClick={
//         () => {
//           this.handleClick()
//         }
//       }
//     >
//       {buttonText}
//     </button>
//   }
// }

// const domContainer = document.getElementById('react_root')
// ReactDOM.render(
//   React.createElement(ClickButton),
//   domContainer
// )

class PostRow extends React.Component {
  render () {
    const post = this.props.post

    let thumbnail

    if (post.hero_image.thumbnail) {
      thumbnail = <img src={post.hero_image.thumbnail}/>
    } else {
      thumbnail = '-'
    }

    return <tr>
      <td>{post.title}</td>
      <td>
        {thumbnail}
      </td>
      <td>{post.tags.join(', ')}</td>
      <td>{post.slug}</td>
      <td>{post.summary}</td>
      <td><a href={'/post/' + post.slug + '/'}>View</a></td>
    </tr>
  }
}

class PostTable extends React.Component {
  state = {
    dataLoaded: true,
    data: {
      results: [
        {
          id: 15,
          tags: [
            'django', 'react'
          ],
          'hero_image': {
            'thumbnail': '/media/__sized__/hero_images/snake-419043_1920-thumbnail-100x100-70.jpg',
            'full_size': '/media/hero_images/snake-419043_1920.jpg'
          },
          title: 'Test Post',
          slug: 'test-post',
          summary: 'A test post, created for Django/React.'
        }
      ]
    }
  }

  render () {
    let rows
    if (this.state.dataLoaded) {
      if (this.state.data.results.length) {
        rows = this.state.data.results.map(post => <PostRow post={post} key={post.id}/>)
      } else {
        rows = <tr>
          <td colSpan="6">No results found.</td>
        </tr>
      }
    } else {
      rows = <tr>
        <td colSpan="6">Loading&hellip;</td>
      </tr>
    }

    return <table className="table table-striped table-bordered mt-2">
      <thead>
      <tr>
        <th>Title</th>
        <th>Image</th>
        <th>Tags</th>
        <th>Slug</th>
        <th>Summary</th>
        <th>Link</th>
      </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  }
}

const domContainer = document.getElementById('react_root')
ReactDOM.render(
  React.createElement(PostTable),
  domContainer
)