import moment from 'moment';

export function massageData(msgs) {
  for (let index = 0; index < msgs.length; index++) {
    const msg = msgs[index];
    const previousMsg = msgs[index - 1];

    if (previousMsg) {
      msg.isContMsg = msg.name === previousMsg.name;
      msg.isNewDate =
        moment(msg.createdAt).format('MMM D, YYYY') !==
        moment(previousMsg.createdAt).format('MMM D, YYYY');
    } else {
      msg.isContMsg = false;
      msg.isNewDate = true;
    }
  }
  return msgs;
}
