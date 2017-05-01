let _subscribers = [];

const subscribe = (subscriber)=> {
  _subscribers.push(subscriber);

  return ()=> {
    _subscribers = _subscribers.filter( s => s !== subscriber);
  };
};

const publish = (type, data)=> {
  _subscribers.forEach( subscriber => {
    if(subscriber.type === type){
      subscriber.fn(data);
    }
  });
}

export default {
  publish,
  subscribe
};
