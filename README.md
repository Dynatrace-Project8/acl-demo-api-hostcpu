# Monitor Host Utilization

This example shows how to create a simple dashboard that analyzes the utilization of all hosts to show instances that are underutilized.

For that we need

* A list of all hosts
* A way to find out the CPU utilization for a certain timeframe for a given host

## Exercise
Without looking at the source code, use the API explorer to find and try out the endpoints you will need to implement this solution.

## Setting up the application

* We will use a .env file to provide the API credentials to our application. For that, copy `.env-sample` to `.env`.
* Fill in the APi credentials you created previously
* In the integrated terminal, in the project directory, run `npm install` to bring in all dependencies
* Run `npm start`
* Go to [localhost on port 3000](http://localhost:3000) to view the dashboard

---

:arrow_forward: [Next Step: Get the most volatile service](../4_Get_the_Most_Volatile_Service)

:arrow_up_small: [Back to overview](../)