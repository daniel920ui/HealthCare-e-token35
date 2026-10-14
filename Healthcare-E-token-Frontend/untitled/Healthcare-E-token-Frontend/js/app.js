/* =========================================================
   HEALTHCARE-E-TOKEN
   FRONTEND JAVASCRIPT
========================================================= */


/* =========================================================
   API CONFIGURATION
========================================================= */

const API_BASE_URL = "http://localhost:8080";



/* =========================================================
   PAGE REFERENCES
========================================================= */

const dashboardPage =
    document.getElementById("dashboardPage");

const appointmentPage =
    document.getElementById("appointmentPage");

const tokenPage =
    document.getElementById("tokenPage");

const queuePage =
    document.getElementById("queuePage");

const doctorsPage =
    document.getElementById("doctorsPage");

const departmentsPage =
    document.getElementById("departmentsPage");

const appointmentsPage =
    document.getElementById("appointmentsPage");



/* =========================================================
   NAVIGATION
========================================================= */

function showPage(page) {

    /* Hide all pages */

    if (dashboardPage) {
        dashboardPage.style.display = "none";
    }

    if (appointmentPage) {
        appointmentPage.style.display = "none";
    }

    if (tokenPage) {
        tokenPage.style.display = "none";
    }

    if (queuePage) {
        queuePage.style.display = "none";
    }

    if (doctorsPage) {
        doctorsPage.style.display = "none";
    }

    if (departmentsPage) {
        departmentsPage.style.display = "none";
    }

    if (appointmentsPage) {
        appointmentsPage.style.display = "none";
    }


    /* Show selected page */

    if (page === "dashboard") {

        if (dashboardPage) {
            dashboardPage.style.display = "block";
        }

        setActiveNav("Dashboard");

        loadDashboardStats();
    }


    else if (page === "appointment") {

        if (appointmentPage) {
            appointmentPage.style.display = "block";
        }

        setActiveNav("Book Appointment");

        loadAppointmentDepartments();
    }


    else if (page === "token") {

        if (tokenPage) {
            tokenPage.style.display = "block";
        }

        setActiveNav("Generate Token");
    }


    else if (page === "queue") {

        if (queuePage) {
            queuePage.style.display = "block";
        }

        setActiveNav("Live Queue");
    }


    else if (page === "doctors") {

        if (doctorsPage) {
            doctorsPage.style.display = "block";
        }

        setActiveNav("Doctors");

        loadDoctors();
    }


    else if (page === "departments") {

        if (departmentsPage) {
            departmentsPage.style.display = "block";
        }

        setActiveNav("Departments");

        loadDepartments();
    }


    else if (page === "appointments") {

        if (appointmentsPage) {
            appointmentsPage.style.display = "block";
        }

        setActiveNav("My Appointments");
    }


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



/* =========================================================
   NAVIGATION SHORTCUTS
========================================================= */

function showDashboard() {

    showPage("dashboard");
}


function showAppointmentPage() {

    showPage("appointment");
}


function showTokenPage() {

    showPage("token");
}



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function setActiveNav(pageName) {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function(item) {

        const spans =
            item.querySelectorAll("span");


        const text =
            spans.length > 1
                ? spans[1].textContent.trim()
                : "";


        if (text === pageName) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });
}



/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

async function loadDashboardStats() {

    try {

        /* -----------------------------------------
           TOTAL DOCTORS
        ----------------------------------------- */

        const doctorsResponse =
            await fetch(
                `${API_BASE_URL}/api/doctors`
            );


        if (doctorsResponse.ok) {

            const doctors =
                await doctorsResponse.json();


            const totalDoctors =
                document.getElementById(
                    "totalDoctors"
                );


            if (totalDoctors) {

                totalDoctors.textContent =
                    doctors.length;

            }

        }



        /* -----------------------------------------
           TOTAL DEPARTMENTS
        ----------------------------------------- */

        const departmentsResponse =
            await fetch(
                `${API_BASE_URL}/api/departments`
            );


        if (departmentsResponse.ok) {

            const departments =
                await departmentsResponse.json();


            const totalDepartments =
                document.getElementById(
                    "totalDepartments"
                );


            if (totalDepartments) {

                totalDepartments.textContent =
                    departments.length;

            }

        }



        /* -----------------------------------------
           TOTAL APPOINTMENTS
        ----------------------------------------- */

        const appointmentsResponse =
            await fetch(
                `${API_BASE_URL}/api/appointments`
            );


        if (appointmentsResponse.ok) {

            const appointments =
                await appointmentsResponse.json();


            const totalAppointments =
                document.getElementById(
                    "totalAppointments"
                );


            if (totalAppointments) {

                totalAppointments.textContent =
                    appointments.length;

            }

        }



        /* -----------------------------------------
           WAITING TOKENS
        ----------------------------------------- */

        const waitingTokensResponse =
            await fetch(
                `${API_BASE_URL}/api/tokens/waiting`
            );


        if (waitingTokensResponse.ok) {

            const waitingTokens =
                await waitingTokensResponse.json();


            const totalWaitingTokens =
                document.getElementById(
                    "totalWaitingTokens"
                );


            if (totalWaitingTokens) {

                totalWaitingTokens.textContent =
                    waitingTokens.length;

            }

        }

    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

    }
}



/* =========================================================
   APPOINTMENT
   DEPARTMENT & DOCTOR REFERENCES
========================================================= */

const departmentSelect =
    document.getElementById("departmentId");

const doctorSelect =
    document.getElementById("doctorId");



/* =========================================================
   LOAD DEPARTMENTS FOR APPOINTMENT
========================================================= */

async function loadAppointmentDepartments() {

    if (!departmentSelect) {
        return;
    }


    try {

        departmentSelect.innerHTML =
            `<option value="">
                Loading departments...
            </option>`;


        const response =
            await fetch(
                `${API_BASE_URL}/api/departments`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load departments."
            );

        }


        const departments =
            await response.json();


        departmentSelect.innerHTML =
            `<option value="">
                Select Department
            </option>`;


        departments.forEach(
            function(department) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    department.id;


                option.textContent =
                    department.name;


                departmentSelect.appendChild(
                    option
                );

            }
        );


        /* Reset doctor dropdown */

        if (doctorSelect) {

            doctorSelect.innerHTML =
                `<option value="">
                    Select Department First
                </option>`;

            doctorSelect.disabled = true;

        }


    } catch (error) {

        console.error(
            "Department loading error:",
            error
        );


        departmentSelect.innerHTML =
            `<option value="">
                Unable to load departments
            </option>`;

    }
}



/* =========================================================
   LOAD DOCTORS BASED ON DEPARTMENT
========================================================= */

async function loadAppointmentDoctors(
    departmentId
) {

    if (!doctorSelect) {
        return;
    }


    doctorSelect.innerHTML =
        `<option value="">
            Loading doctors...
        </option>`;


    doctorSelect.disabled = true;


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/doctors`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load doctors."
            );

        }


        const doctors =
            await response.json();


        /* -----------------------------------------
           FILTER DOCTORS
        ----------------------------------------- */

        const filteredDoctors =
            doctors.filter(
                function(doctor) {

                    return (

                        doctor.active === true &&

                        doctor.department &&

                        String(
                            doctor.department.id
                        ) ===
                        String(departmentId)

                    );

                }
            );


        doctorSelect.innerHTML =
            `<option value="">
                Select Doctor
            </option>`;


        /* -----------------------------------------
           NO DOCTORS
        ----------------------------------------- */

        if (filteredDoctors.length === 0) {

            doctorSelect.innerHTML =
                `<option value="">
                    No doctors available
                </option>`;

            doctorSelect.disabled = true;

            return;
        }


        /* -----------------------------------------
           ADD DOCTORS
        ----------------------------------------- */

        filteredDoctors.forEach(
            function(doctor) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    doctor.id;


                option.textContent =
                    doctor.name;


                doctorSelect.appendChild(
                    option
                );

            }
        );


        doctorSelect.disabled = false;


    } catch (error) {

        console.error(
            "Doctor loading error:",
            error
        );


        doctorSelect.innerHTML =
            `<option value="">
                Unable to load doctors
            </option>`;

        doctorSelect.disabled = true;

    }
}



/* =========================================================
   DEPARTMENT CHANGE EVENT
========================================================= */

if (departmentSelect) {

    departmentSelect.addEventListener(
        "change",
        function() {

            const departmentId =
                this.value;


            if (!departmentId) {

                if (doctorSelect) {

                    doctorSelect.innerHTML =
                        `<option value="">
                            Select Department First
                        </option>`;

                    doctorSelect.disabled = true;

                }

                return;
            }


            loadAppointmentDoctors(
                departmentId
            );

        }
    );

}



/* =========================================================
   BOOK APPOINTMENT
========================================================= */

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const patientId =
                document.getElementById(
                    "patientId"
                ).value.trim();


            const doctorId =
                document.getElementById(
                    "doctorId"
                ).value;


            const appointmentDate =
                document.getElementById(
                    "appointmentDate"
                ).value;


            const appointmentStatus =
                document.getElementById(
                    "appointmentStatus"
                ).value;


            const message =
                document.getElementById(
                    "appointmentMessage"
                );


            /* -------------------------------------
               VALIDATION
            ------------------------------------- */

            if (!patientId) {

                message.textContent =
                    "Please enter Patient ID.";

                return;
            }


            if (!doctorId) {

                message.textContent =
                    "Please select a doctor.";

                return;
            }


            if (!appointmentDate) {

                message.textContent =
                    "Please select appointment date and time.";

                return;
            }


            /* -------------------------------------
               REQUEST
            ------------------------------------- */

            try {

                message.textContent =
                    "Booking appointment...";


                const response =
                    await fetch(
                        `${API_BASE_URL}/api/appointments` +
                        `?patientId=${patientId}` +
                        `&doctorId=${doctorId}`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                appointmentDate:
                                    appointmentDate,

                                status:
                                    appointmentStatus

                            })

                        }
                    );


                /* ---------------------------------
                   SUCCESS
                --------------------------------- */

                if (response.ok) {

                    const appointment =
                        await response.json();


                    message.textContent =
                        `Appointment booked successfully! ` +
                        `Appointment ID: ${appointment.id}`;


                    message.style.background =
                        "#e7eee4";

                    message.style.color =
                        "#53664d";


                    /* Refresh dashboard */

                    loadDashboardStats();


                    /* Reset form */

                    appointmentForm.reset();


                    if (doctorSelect) {

                        doctorSelect.innerHTML =
                            `<option value="">
                                Select Department First
                            </option>`;

                        doctorSelect.disabled =
                            true;

                    }


                    if (departmentSelect) {

                        departmentSelect.value =
                            "";

                    }

                }


                /* ---------------------------------
                   ERROR
                --------------------------------- */

                else {

                    let errorMessage =
                        "Unable to book appointment.";


                    try {

                        const errorData =
                            await response.json();


                        if (errorData.message) {

                            errorMessage =
                                errorData.message;

                        }

                    } catch (error) {

                        console.error(
                            "Error parsing response:",
                            error
                        );

                    }


                    message.textContent =
                        errorMessage;


                    message.style.background =
                        "#f5e4df";

                    message.style.color =
                        "#8a5145";

                }


            } catch (error) {

                console.error(
                    "Appointment error:",
                    error
                );


                message.textContent =
                    "Unable to connect to the backend.";


                message.style.background =
                    "#f5e4df";

                message.style.color =
                    "#8a5145";

            }

        }
    );

}



/* =========================================================
   GENERATE TOKEN
========================================================= */

const tokenForm =
    document.getElementById(
        "tokenForm"
    );


if (tokenForm) {

    tokenForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const appointmentId =
                document.getElementById(
                    "tokenAppointmentId"
                ).value.trim();


            const message =
                document.getElementById(
                    "tokenMessage"
                );


            const tokenResult =
                document.getElementById(
                    "tokenResult"
                );


            if (!appointmentId) {

                message.textContent =
                    "Please enter Appointment ID.";

                return;
            }


            try {

                message.textContent =
                    "Generating token...";


                const response =
                    await fetch(
                        `${API_BASE_URL}/api/appointments/${appointmentId}/token`,
                        {
                            method: "POST"
                        }
                    );


                if (response.ok) {

                    const token =
                        await response.json();


                    /* Token number */

                    document.getElementById(
                        "generatedToken"
                    ).textContent =
                        token.tokenNumber || "-";


                    /* Patient */

                    document.getElementById(
                        "tokenPatient"
                    ).textContent =
                        token.patientName || "-";


                    /* Doctor */

                    let doctorName = "-";


                    if (token.doctor) {

                        doctorName =
                            token.doctor.name ||
                            "-";

                    }


                    document.getElementById(
                        "tokenDoctor"
                    ).textContent =
                        doctorName;


                    /* Status */

                    document.getElementById(
                        "tokenStatus"
                    ).textContent =
                        token.status || "-";


                    /* Show result */

                    tokenResult.style.display =
                        "block";


                    message.textContent =
                        "Token generated successfully!";


                    message.style.background =
                        "#e7eee4";

                    message.style.color =
                        "#53664d";


                    /* Update dashboard */

                    loadDashboardStats();

                }


                else {

                    let errorMessage =
                        "Unable to generate token.";


                    try {

                        const errorData =
                            await response.json();


                        if (errorData.message) {

                            errorMessage =
                                errorData.message;

                        }

                    } catch (error) {

                        console.error(
                            error
                        );

                    }


                    message.textContent =
                        errorMessage;


                    message.style.background =
                        "#f5e4df";

                    message.style.color =
                        "#8a5145";

                }


            } catch (error) {

                console.error(
                    "Token error:",
                    error
                );


                message.textContent =
                    "Unable to connect to the backend.";


                message.style.background =
                    "#f5e4df";

                message.style.color =
                    "#8a5145";

            }

        }
    );

}



/* =========================================================
   LIVE QUEUE
========================================================= */

async function loadQueue() {

    const doctorId =
        document.getElementById(
            "queueDoctorId"
        ).value.trim();


    const queueMessage =
        document.getElementById(
            "queueMessage"
        );


    const waitingQueue =
        document.getElementById(
            "waitingQueue"
        );


    const waitingCount =
        document.getElementById(
            "waitingCount"
        );


    if (!doctorId) {

        queueMessage.textContent =
            "Please enter Doctor ID.";

        return;
    }


    try {

        queueMessage.textContent =
            "Loading queue...";


        /* -----------------------------------------
           WAITING TOKENS
        ----------------------------------------- */

        const waitingResponse =
            await fetch(
                `${API_BASE_URL}/api/tokens/waiting/doctor/${doctorId}`
            );


        if (!waitingResponse.ok) {

            throw new Error(
                "Unable to load waiting queue."
            );

        }


        const waitingTokens =
            await waitingResponse.json();


        waitingQueue.innerHTML = "";


        waitingCount.textContent =
            waitingTokens.length;


        if (waitingTokens.length === 0) {

            waitingQueue.innerHTML =
                `<div class="empty-queue">
                    No patients waiting.
                </div>`;

        }


        waitingTokens.forEach(
            function(token) {

                const queueItem =
                    document.createElement(
                        "div"
                    );


                queueItem.className =
                    "queue-item";


                queueItem.innerHTML = `

                    <div>

                        <strong>
                            ${token.tokenNumber || "-"}
                        </strong>

                        <span>
                            ${token.patientName || "Unknown Patient"}
                        </span>

                    </div>

                    <span>
                        WAITING
                    </span>

                `;


                waitingQueue.appendChild(
                    queueItem
                );

            }
        );



        /* -----------------------------------------
           SERVING TOKEN
        ----------------------------------------- */

        const servingResponse =
            await fetch(
                `${API_BASE_URL}/api/tokens/serving/doctor/${doctorId}`
            );


        const servingToken =
            servingResponse.ok
                ? await servingResponse.json()
                : null;


        const servingTokenElement =
            document.getElementById(
                "servingToken"
            );


        const servingPatient =
            document.getElementById(
                "servingPatient"
            );


        const servingDoctor =
            document.getElementById(
                "servingDoctor"
            );


        if (servingToken) {

            servingTokenElement.textContent =
                servingToken.tokenNumber || "-";


            servingPatient.textContent =
                servingToken.patientName ||
                "-";


            servingDoctor.textContent =
                servingToken.doctor
                    ? servingToken.doctor.name
                    : "-";

        }


        else {

            servingTokenElement.textContent =
                "NONE";


            servingPatient.textContent =
                "-";


            servingDoctor.textContent =
                "-";

        }


        queueMessage.textContent =
            "Queue updated successfully.";


        queueMessage.style.background =
            "#e7eee4";

        queueMessage.style.color =
            "#53664d";


    } catch (error) {

        console.error(
            "Queue loading error:",
            error
        );


        queueMessage.textContent =
            "Unable to load queue.";


        queueMessage.style.background =
            "#f5e4df";

        queueMessage.style.color =
            "#8a5145";

    }
}



/* =========================================================
   CALL NEXT TOKEN
========================================================= */

async function callNextToken() {

    const doctorId =
        document.getElementById(
            "queueDoctorId"
        ).value.trim();


    const queueMessage =
        document.getElementById(
            "queueMessage"
        );


    if (!doctorId) {

        queueMessage.textContent =
            "Please enter Doctor ID.";

        return;
    }


    try {

        queueMessage.textContent =
            "Calling next token...";


        const response =
            await fetch(
                `${API_BASE_URL}/api/tokens/next/doctor/${doctorId}`,
                {
                    method: "POST"
                }
            );


        if (response.ok) {

            const token =
                await response.json();


            queueMessage.textContent =
                `Token ${token.tokenNumber} is now serving.`;


            queueMessage.style.background =
                "#e7eee4";

            queueMessage.style.color =
                "#53664d";


            /* Refresh queue */

            await loadQueue();


            /* Refresh dashboard */

            loadDashboardStats();

        }


        else {

            let errorMessage =
                "Unable to call next token.";


            try {

                const errorData =
                    await response.json();


                if (errorData.message) {

                    errorMessage =
                        errorData.message;

                }

            } catch (error) {

                console.error(
                    error
                );

            }


            queueMessage.textContent =
                errorMessage;


            queueMessage.style.background =
                "#f5e4df";

            queueMessage.style.color =
                "#8a5145";

        }


    } catch (error) {

        console.error(
            "Call next token error:",
            error
        );


        queueMessage.textContent =
            "Unable to connect to the backend.";


        queueMessage.style.background =
            "#f5e4df";

        queueMessage.style.color =
            "#8a5145";

    }
}



/* =========================================================
   DOCTORS PAGE
========================================================= */

async function loadDoctors() {

    const doctorsGrid =
        document.getElementById(
            "doctorsGrid"
        );


    const doctorMessage =
        document.getElementById(
            "doctorMessage"
        );


    if (!doctorsGrid) {
        return;
    }


    try {

        doctorMessage.textContent =
            "Loading doctors...";


        doctorsGrid.innerHTML = "";


        const response =
            await fetch(
                `${API_BASE_URL}/api/doctors`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load doctors."
            );

        }


        const doctors =
            await response.json();


        if (doctors.length === 0) {

            doctorMessage.textContent =
                "No doctors available.";

            return;
        }


        doctorMessage.textContent =
            `${doctors.length} doctors available.`;


        doctors.forEach(
            function(doctor) {

                const doctorName =
                    doctor.name ||
                    "Unknown Doctor";


                let departmentName =
                    "Department not assigned";


                if (doctor.department) {

                    departmentName =
                        doctor.department.name ||
                        "Unknown Department";

                }


                const status =
                    doctor.active === true
                        ? "Active"
                        : "Inactive";


                const doctorCard =
                    document.createElement(
                        "div"
                    );


                doctorCard.className =
                    "doctor-card";


                doctorCard.innerHTML = `

                    <div class="doctor-icon">
                        👨‍⚕️
                    </div>

                    <h3>
                        ${doctorName}
                    </h3>

                    <p>
                        🏥 ${departmentName}
                    </p>

                    <span class="doctor-status">
                        ${status}
                    </span>

                `;


                doctorsGrid.appendChild(
                    doctorCard
                );

            }
        );


    } catch (error) {

        console.error(
            "Doctors loading error:",
            error
        );


        doctorMessage.textContent =
            "Unable to load doctors.";


        doctorMessage.style.color =
            "#8a5145";

    }
}



/* =========================================================
   DEPARTMENTS PAGE
========================================================= */

async function loadDepartments() {

    const departmentsGrid =
        document.getElementById(
            "departmentsGrid"
        );


    const departmentMessage =
        document.getElementById(
            "departmentMessage"
        );


    if (!departmentsGrid) {
        return;
    }


    try {

        departmentMessage.textContent =
            "Loading departments...";


        departmentsGrid.innerHTML = "";


        const response =
            await fetch(
                `${API_BASE_URL}/api/departments`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load departments."
            );

        }


        const departments =
            await response.json();


        if (departments.length === 0) {

            departmentMessage.textContent =
                "No departments available.";

            return;
        }


        departmentMessage.textContent =
            `${departments.length} departments available.`;


        departments.forEach(
            function(department) {

                const departmentName =
                    department.name ||
                    "Unknown Department";


                const departmentCard =
                    document.createElement(
                        "div"
                    );


                departmentCard.className =
                    "department-card";


                departmentCard.innerHTML = `

                    <div class="department-icon">
                        🏥
                    </div>

                    <h3>
                        ${departmentName}
                    </h3>

                    <p>
                        Healthcare Department
                    </p>

                    <span class="department-status">
                        Active
                    </span>

                `;


                departmentsGrid.appendChild(
                    departmentCard
                );

            }
        );


    } catch (error) {

        console.error(
            "Department page error:",
            error
        );


        departmentMessage.textContent =
            "Unable to load departments.";


        departmentMessage.style.color =
            "#8a5145";

    }
}



/* =========================================================
   MY APPOINTMENTS
========================================================= */

function formatAppointmentDate(
    dateTime
) {

    if (!dateTime) {
        return "-";
    }


    const date =
        new Date(dateTime);


    if (isNaN(date.getTime())) {
        return dateTime;
    }


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit",

            hour12: true
        }
    );
}



async function loadMyAppointments() {

    const patientId =
        document.getElementById(
            "myPatientId"
        ).value.trim();


    const message =
        document.getElementById(
            "myAppointmentMessage"
        );


    const appointmentsList =
        document.getElementById(
            "appointmentsList"
        );


    if (!patientId) {

        message.textContent =
            "Please enter Patient ID.";

        return;
    }


    try {

        message.textContent =
            "Loading appointments...";


        appointmentsList.innerHTML = "";


        const response =
            await fetch(
                `${API_BASE_URL}/api/appointments`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load appointments."
            );

        }


        const appointments =
            await response.json();


        /* -----------------------------------------
           FILTER BY PATIENT
        ----------------------------------------- */

        const patientAppointments =
            appointments.filter(
                function(appointment) {

                    return (

                        appointment.patient &&

                        String(
                            appointment.patient.id
                        ) ===
                        String(patientId)

                    );

                }
            );


        if (
            patientAppointments.length === 0
        ) {

            message.textContent =
                "No appointments found.";


            appointmentsList.innerHTML =
                `<div class="empty-queue">
                    No appointments found for this patient.
                </div>`;

            return;
        }


        message.textContent =
            `${patientAppointments.length} appointment(s) found.`;


        patientAppointments.forEach(
            function(appointment) {

                const patient =
                    appointment.patient
                        ? appointment.patient.name
                        : "-";


                const doctor =
                    appointment.doctor
                        ? appointment.doctor.name
                        : "-";


                const department =
                    appointment.doctor &&
                    appointment.doctor.department
                        ? appointment.doctor.department.name
                        : "-";


                const appointmentDate =
                    formatAppointmentDate(
                        appointment.appointmentDate
                    );


                const status =
                    appointment.status ||
                    "UNKNOWN";


                const appointmentCard =
                    document.createElement(
                        "div"
                    );


                appointmentCard.className =
                    "my-appointment-card";


                appointmentCard.innerHTML = `

                    <div class="appointment-card-icon">
                        📅
                    </div>

                    <h3>
                        Appointment #${appointment.id}
                    </h3>

                    <p>
                        <strong>
                            Patient:
                        </strong>
                        ${patient}
                    </p>

                    <p>
                        <strong>
                            Doctor:
                        </strong>
                        ${doctor}
                    </p>

                    <p>
                        <strong>
                            Department:
                        </strong>
                        ${department}
                    </p>

                    <p>
                        <strong>
                            Date:
                        </strong>
                        ${appointmentDate}
                    </p>

                    <span class="appointment-status">
                        ${status}
                    </span>

                `;


                appointmentsList.appendChild(
                    appointmentCard
                );

            }
        );


    } catch (error) {

        console.error(
            "My appointments error:",
            error
        );


        message.textContent =
            "Unable to load appointments.";


        message.style.background =
            "#f5e4df";

        message.style.color =
            "#8a5145";

    }
}



/* =========================================================
   DATE & TIME
========================================================= */

function updateDateTime() {

    const dateElement =
        document.querySelector(
            ".datetime div"
        );


    const timeElement =
        document.querySelector(
            ".datetime strong"
        );


    if (!dateElement ||
        !timeElement) {

        return;
    }


    const now =
        new Date();


    dateElement.textContent =
        "📅 " +
        now.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",

                month: "short",

                year: "numeric"
            }
        );


    timeElement.textContent =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",

                minute: "2-digit",

                hour12: true
            }
        );
}



/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* Show dashboard */

        showDashboard();


        /* Update date/time */

        updateDateTime();

    }
);



/* =========================================================
   UPDATE CLOCK EVERY MINUTE
========================================================= */

setInterval(
    updateDateTime,
    60000
);