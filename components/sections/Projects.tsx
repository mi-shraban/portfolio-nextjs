import Image from 'next/image';
import React from "react";

export default function Projects() {
	return (
		<section id="projects" className="section">
			<h2>Projects</h2>

			<div className="card project">
				<div style={{flex: 1, minWidth: 0}}>
					<h3>
						Blood Donation Services
						<br/>
						<a className="proj_link" href="https://github.com/mi-shraban/Blood-Donation-Services"
						   target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							Github Repo
						</a>
					</h3>
					<ul>
						<li>Tools: <i>HTML, CSS, Tailwind, PHP, MySql</i></li>
						<li>
							<p>
								Developed a website, where users can register and choose to become blood donors and
								anyone can post their need for blood and registered donors will be able to see the
								requests and respond to them.
							</p>
						</li>
					</ul>
				</div>
				<div className="projectThumb">
					<a href="https://github.com/mi-shraban/Blood-Donation-Services" target="_blank"
					   rel="noopener noreferrer">
						<Image
							className="projectImg"
							src="https://repository-images.githubusercontent.com/927801658/2f8c3dcf-5fd6-432e-ad75-a1ea50529f78?v=2"
							alt="Blood Donation Services"
							fill
							style={{ objectFit: "cover" }}
						/>
					</a>
					<div className="thumbOverlay">
						<a className="btn" href="https://github.com/mi-shraban/Blood-Donation-Services" target="_blank"
						   rel="noopener noreferrer"><span className="link_icon">&#x1F517;&#xFE0E;</span> Github Repo</a>
					</div>
				</div>
			</div>

			<div className="card project">
				<div style={{flex: 1, minWidth: 0}}>
					<h3>
						Blood Aid
						<br/>
						<a className="proj_link" href="https://github.com/mi-shraban/BloodAid" target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							Github Repo
						</a>
						<a className="proj_link" href="https://bloodaid-2wfk.onrender.com/" target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							Live Demo
						</a>
					</h3>
					<ul>
						<li>Tools: <i>HTML, CSS, Tailwind, Python, Flask, SQLite</i></li>
						<li>
							<p>
								A rework of the Blood Donation System. Here, security was improved
								using the Bcrypt encryption algorithm. In addition, newer technologies such as Flask
								framework were used to modernize the code base.
							</p>
						</li>
					</ul>
				</div>
				<div className="projectThumb">
					<a href="https://github.com/mi-shraban/BloodAid" target="_blank" rel="noopener noreferrer">
						<Image
							className="projectImg"
							src="https://repository-images.githubusercontent.com/1047299205/0f64c7c4-d72f-4db0-8039-10a01f376854"
							alt="Blood Aid"
							fill
							style={{ objectFit: "cover" }}
						/>
					</a>
					<div className="thumbOverlay">
						<a className="btn" href="https://bloodaid-2wfk.onrender.com/" target="_blank"
						   rel="noopener noreferrer"><span className="link_icon">&#x1F517;&#xFE0E;</span> Live Demo</a>
					</div>
				</div>
			</div>

			<div className="card project">
				<div style={{flex: 1, minWidth: 0}}>
					<h3>
						DSE Stock Closing Price Prediction
						<br/>
						<a className="proj_link"
						   href="https://github.com/mi-shraban/DSE-Stock-Closing-Price-Prediction/" target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							Github Repo
						</a>
						<a className="proj_link"
						   href="https://github.com/mi-shraban/DSE-Stock-Closing-Price-Prediction/blob/main/422_Project_SVR_RFR_LR_LSTM_CNN.ipynb"
						   target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							EDA Notebook
						</a>
					</h3>
					<ul>
						<li>Tools: <i> Python, NumPy, Pandas, Matplotlib, Scikit-Learn</i></li>
						<li>
							<p>
								Compared accuracy of Support vector regression (SVR), Random Forest Regression (RFR),
								Linear Regression (LR), LSTM (Long Short Term Memory) and Convolutional Neural
								Network(CNN) at predicting stock price trends using the DSE stock dataset from Kaggle.
							</p>
						</li>
					</ul>
				</div>
				<div className="projectThumb">
					<a href="https://github.com/mi-shraban/DSE-Stock-Closing-Price-Prediction/blob/main/422_Project_SVR_RFR_LR_LSTM_CNN.ipynb"
					   target="_blank" rel="noopener noreferrer">
						<Image
							className="projectImg"
							src="https://repository-images.githubusercontent.com/920718087/ca6947da-ae19-44e7-9c31-7446971f5dca"
							alt="DSE Stock Closing Price Prediction"
							fill
							style={{ objectFit: "cover" }}
						/>
					</a>
					<div className="thumbOverlay">
						<a className="btn"
						   href="https://github.com/mi-shraban/DSE-Stock-Closing-Price-Prediction/blob/main/422_Project_SVR_RFR_LR_LSTM_CNN.ipynb"
						   target="_blank" rel="noopener noreferrer"><span className="link_icon">&#x1F517;&#xFE0E;</span> Exploratory Data Analysis</a>
					</div>
				</div>
			</div>

			<div className="card project">
				<div style={{flex: 1, minWidth: 0}}>
					<h3>
						Exam Hall Monitoring System
						<br/>
						<a className="proj_link" href="https://github.com/mi-shraban/Exam-Hall-Monitoring-System"
						   target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							Github Repo
						</a>
					</h3>
					<ul>
						<li>Tools: <i>Python, C++, Arduino, OpenCV, YOLOv3, CNN, ESP32-s3</i></li>
						<li>
							<p>
								Developed a robotics project using ESP32-s3 cam module and Arduino UNO to detect
								violations of exam hall regulations. The robot can navigate around the classroom
								autonomously, the Arduino uno processes the navigation system, and the camera module
								streams a video feed on the local Wi-Fi network and the python program fetches the
								stream and processes it in real time to find violations. Any such incident is
								screenshotted and an alarm is buzzed to seek invigilator’s attention.
							</p>
						</li>
					</ul>
				</div>
				<div className="projectThumb">
					<a href="https://github.com/mi-shraban/Exam-Hall-Monitoring-System" target="_blank"
					   rel="noopener noreferrer">
						<Image
							className="projectImg"
							src="https://opengraph.githubassets.com/9c83a99f458cd6021b13c775a2bcaf85679ac4e996c7516a9f70469a3efa8bdd/mi-shraban/Exam-Hall-Monitoring-System"
							alt="Exam Hall Monitoring System"
							fill
							style={{ objectFit: "cover" }}
						/>
					</a>
					<div className="thumbOverlay">
						<a className="btn" href="https://github.com/mi-shraban/Exam-Hall-Monitoring-System"
						   target="_blank" rel="noopener noreferrer"><span className="link_icon">&#x1F517;&#xFE0E;</span> Github Repo</a>
					</div>
				</div>
			</div>

			<div className="card project">
				<div style={{flex: 1, minWidth: 0}}>
					<h3>
						Anomaly Detection in Network Traffic
						<br/>
						<a className="proj_link"
						   href="https://github.com/mi-shraban/Anomaly-Detection-in-Network-Traffic/"
						   target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							Github Repo
						</a>
						<a className="proj_link"
						   href="https://github.com/mi-shraban/Anomaly-Detection-in-Network-Traffic/blob/main/Anomaly_Detection_in_Network_Traffic.ipynb"
						   target="_blank">
							<span className="link_icon">&#x1F517;&#xFE0E;</span>
							EDA Notebook
						</a>
					</h3>
					<ul>
						<li>Tools: <i>Python, Pandas, Scikit-Learn, XGBoost, CatBoost, TensorFlow</i></li>
						<li>
							<p>
								This project focuses on detecting anomalies in network traffic using two different type
								machine learning (ML) models, Ensemble Learning and Deep Learning. Comparing the results
								to determine which is more effective for intrusion detection in cybersecurity.
							</p>
						</li>
					</ul>
				</div>
				<div className="projectThumb">
					<a href="https://github.com/mi-shraban/Anomaly-Detection-in-Network-Traffic/blob/main/Anomaly_Detection_in_Network_Traffic.ipynb"
					   target="_blank" rel="noopener noreferrer">
						<Image
							className="projectImg"
							src="https://opengraph.githubassets.com/b8e5a84ffccf0404b9d849bc502aaf0172ea3dc27097c4676e9cfd6817944297/mi-shraban/Anomaly-Detection-in-Network-Traffic"
							alt="Anomaly Detection in Network Traffic"
							fill
							style={{ objectFit: "cover" }}
						/>
					</a>
					<div className="thumbOverlay">
						<a className="btn"
						   href="https://github.com/mi-shraban/Anomaly-Detection-in-Network-Traffic/blob/main/Anomaly_Detection_in_Network_Traffic.ipynb"
						   target="_blank" rel="noopener noreferrer"><span className="link_icon">&#x1F517;&#xFE0E;</span> Exploratory Data Analysis</a>
					</div>
				</div>
			</div>
		</section>
	)
}
