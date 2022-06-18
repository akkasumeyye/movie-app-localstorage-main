import React from 'react'
import { Puff } from 'react-loader-spinner';
import './Loading.scss'

function Loading({loading = true, children, style = {}}) {
    return (
      <>
        {loading ? (
          <div className='loadingWrapper'>
            <Puff type="Puff" color="#1976D2" height={70} width={70} style={style}/>
          </div>
        ) : (
          <>{children}</>
        )}
      </>
    );
  }
  
  export default Loading;