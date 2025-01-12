import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';
 
import '@stream-io/video-react-sdk/dist/css/styles.css';
import React from 'react';
 
const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0R1cmdlIiwidXNlcl9pZCI6IkR1cmdlIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzY1ODM1NjAsImV4cCI6MTczNzE4ODM2MH0.bjyh-WT5WARFd81htYIcnVFZmYULG7dW8mL3wtg77bk';
const userId = 'Durge';
const callId = 'mmhfdzb5evj2';
 
const user: User = {
  id: userId,
  name: 'Mitali Pawar',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};
 
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });
 
export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}
 
export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
 
  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }
 
  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
};