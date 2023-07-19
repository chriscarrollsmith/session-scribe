import { useEffect, useState } from 'react';
import styles from '../styles/Print.module.css'

const Print = () => {
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const fetchTranscripts = async () => {
    try {
      const res = await fetch('/api/supabaseFetch');
      const data = await res.json();

      setTranscripts(data);  // Update the transcripts state
    } catch (error) {
      console.error('An error occurred while fetching the transcripts:', error);
    }
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className={styles.title}>
          SessionScribe
        </h1>
        <h1 className={styles.title}>
          Print a transcript
        </h1>
        <p className={styles.description}> Print a session transcript and retrieve it from the conference printing station </p>

        {/* Display the transcripts */}
        <div className={styles.grid}>
          {transcripts.map((transcript, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.cell}>{new Date(transcript.created_at).toLocaleString()}</div>
              <div className={styles.cell}>{transcript.session_name}</div>
              <div className={styles.cell}>{transcript.presenters}</div>
              <div className={styles.cell}>
                <button className = {styles.printbutton} id={transcript.id} onClick={() => printTranscript(transcript.id)}>Print</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Print;
