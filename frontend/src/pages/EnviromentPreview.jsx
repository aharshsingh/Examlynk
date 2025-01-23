import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EnviromentPreview() {
  const videoRef = useRef(null);
  const [permissionGranted,setPermissionGranted] = useState(false);

  useEffect(() => {
    async function getMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setPermissionGranted(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Error accessing media devices.', err);
        setPermissionGranted(false);
      }
    }

    getMediaStream();
  }, [setPermissionGranted]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '50px', alignItems: 'center', padding: '20px', marginTop: '200px' }}>
      <div
        style={{
          width: '80%',
          maxWidth: '800px',
          padding: '20px',
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          height: '400px',
          overflowY: 'scroll',
          textAlign: 'left',
          marginLeft: '210px',
        }}
      >
        <h2>Online Test Platform Instructions</h2><br />
        <h3>Camera and Microphone Setup</h3>
        <p>
          <strong>Enable Camera & Microphone:</strong><br />
          Before starting the test, you must allow access to your camera and microphone. This is required to monitor the test environment and ensure the integrity of the examination process.
          A prompt will appear asking for permission. Please click "Allow" to proceed.
          Ensure your camera is positioned correctly and that your face is fully visible. Keep your microphone active throughout the test.
          <em>Note: Any attempt to disable the camera or microphone during the test may result in automatic disqualification.</em>
        </p><br />
        <h3>Test Navigation and Features</h3>
        <p>
          <strong>Mark for Review:</strong><br />
          If you’re unsure about a question, you can mark it for review. This option allows you to revisit the question later before submitting the test.
          To mark a question, click the "Mark for Review" button. The question will be highlighted in your question navigator.
        </p>
        <p>
          <strong>Next:</strong><br />
          Use the "Next" button to move to the next question.
          Ensure you have selected an option before moving forward, or mark the question for review if you wish to answer it later.
        </p>
        <p>
          <strong>Previous:</strong><br />
          The "Previous" button allows you to go back to the previous question.
          You can change your answers or review marked questions using this button.
        </p>
        <p>
          <strong>Submit Test:</strong><br />
          Once you’ve completed all the questions, or if you decide to end the test early, click the "Submit Test" button.
          A confirmation prompt will appear. Ensure you have reviewed all your answers before confirming, as submission is final.
        </p>
        <p>
          <strong>Selecting Options:</strong><br />
          Each question will have multiple options. Click on the option you wish to select.
          You can change your selection by clicking on a different option.
          Ensure your selection is final before moving to the next question, especially if you do not intend to mark the question for review.
        </p><br />
        <h3>Final Review and Submission</h3>
        <p>
          <strong>Review All:</strong><br />
          Before submitting, use the review feature to see all questions and your responses. Pay special attention to those marked for review.
          Once satisfied, click "Submit Test."
        </p><br />
        <h3>Important Reminders</h3>
        <p>
          <strong>Time Management:</strong> Keep an eye on the timer. The test will automatically submit when time runs out.<br />
          <strong>Stable Internet Connection:</strong> Ensure you have a stable internet connection throughout the test to avoid interruptions.
        </p>
        <p>These instructions should provide clear guidance for users taking the test on your platform.</p>
      </div>
      {permissionGranted ? (
        <div
          style={{
            marginTop: '0px',
            border: '1px solid #dddddd3b',
            width: '100%',
            maxWidth: '600px',
            height: '400px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          ></video>
          <Link to="/test">
            <button className="startButton" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', width: '200px', marginLeft:'200px' }}>
              Start Test
            </button>
          </Link>
        </div>
      ) : (
        <p style={{ color: 'white' }}>Permission to access the camera and microphone is required to view the preview.</p>
      )}
    </div>
  );
}
