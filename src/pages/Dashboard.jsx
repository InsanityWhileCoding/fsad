import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDiseases: 0,
    upcomingReminders: 0,
    todayReminders: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUserData(user);

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const diseases = JSON.parse(localStorage.getItem('diseases') || '[]');
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');

    const today = new Date().toISOString().split('T')[0];
    const todayReminders = reminders.filter(r => r.date === today).length;

    setStats({
      totalPatients: patients.length,
      totalDiseases: diseases.length,
      upcomingReminders: reminders.length,
      todayReminders: todayReminders
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {userData?.name || 'User'}!</h1>
        <p>Manage and monitor your chronic care health records</p>
      </div>

      <div className="stats-grid">
        <Link to="/patients" className="stat-card">
          <div className="stat-icon patients-icon">👥</div>
          <div className="stat-content">
            <h3>Total Patients</h3>
            <p className="stat-number">{stats.totalPatients}</p>
            <span className="stat-label">Click to manage</span>
          </div>
        </Link>

        <Link to="/diseases" className="stat-card">
          <div className="stat-icon diseases-icon">🏥</div>
          <div className="stat-content">
            <h3>Chronic Diseases</h3>
            <p className="stat-number">{stats.totalDiseases}</p>
            <span className="stat-label">Click to view</span>
          </div>
        </Link>

        <Link to="/reminders" className="stat-card">
          <div className="stat-icon reminders-icon">🔔</div>
          <div className="stat-content">
            <h3>Upcoming Reminders</h3>
            <p className="stat-number">{stats.upcomingReminders}</p>
            <span className="stat-label">Click to manage</span>
          </div>
        </Link>

        <div className="stat-card">
          <div className="stat-icon today-icon">📅</div>
          <div className="stat-content">
            <h3>Today's Tasks</h3>
            <p className="stat-number">{stats.todayReminders}</p>
            <span className="stat-label">Reminders for today</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <Link to="/patients" className="action-btn">
              <span className="action-icon">➕</span>
              Add/View Patients
            </Link>
            <Link to="/diseases" className="action-btn">
              <span className="action-icon">🔍</span>
              Track Diseases
            </Link>
            <Link to="/reminders" className="action-btn">
              <span className="action-icon">⏰</span>
              Set Reminders
            </Link>
          </div>
        </div>

        <div className="content-section">
          <h2>Health Tips</h2>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">💊</span>
              <p>Take medications on schedule to manage your chronic conditions effectively</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🏃</span>
              <p>Regular exercise helps improve overall health and manage symptoms</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🥗</span>
              <p>Maintain a balanced diet suitable for your health conditions</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">😴</span>
              <p>Get adequate sleep to support your immune system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
