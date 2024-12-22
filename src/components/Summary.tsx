import React from 'react'

interface SummaryProps {
  loading: boolean
  userInfo: any
}

const Summary: React.FC<SummaryProps> = ({ loading, userInfo }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Summary</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userInfo && (
          <div>
            <p>Projects: {userInfo.public_repos}</p>
            <p>Followers: {userInfo.followers}</p>
            <p>Following: {userInfo.following}</p>
          </div>
        )
      )}
    </div>
  )
}

export default Summary
