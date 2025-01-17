// libraries
import Cookies from 'js-cookie';

// styles
import { Flex } from '@/styles/common/direction';

// types
import { ChatDataType } from '@/types/chat';

interface ChatContentType {
  chatData: ChatDataType[];
  messageEndRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ChatContent = ({ chatData, messageEndRef }: ChatContentType) => {
  console.log(chatData);
  return chatData?.map((d, i) => (
    <div key={i}>
      {Number(Cookies.get('user_index')) === d.senderID ? (
        <div className="myChat">
          <div style={{ ...Flex, alignItems: 'flex-end' }}>
            <span className="userName">{d.user_id}</span>
            <div className="myContent">{d.chat_content}</div>
          </div>
        </div>
      ) : (
        <div className="otherChat">
          <div style={{ ...Flex, alignItems: 'flex-start' }}>
            <span className="otherUserName">{d.chat_user_nickname}</span>
            <div className="otherContent">{d.chat_content}</div>
          </div>
        </div>
      )}
      <div ref={messageEndRef}></div>
    </div>
  ));
};

export default ChatContent;
