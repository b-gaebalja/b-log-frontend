import ErrorIcon from '@mui/icons-material/Error';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
};

function Error404() {
  return (
      <div style={styles.container}>
        <div>
          <h1>잘못된 요청입니다</h1>
          <h1><ErrorIcon/>404 ERROR</h1>
        </div>

      </div>
  );
}

export default Error404;