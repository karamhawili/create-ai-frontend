<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/logo.png" alt="create.ai logo" width="170">
  <br>
  <br>
  create.ai
  <br>
</h1>
<h3 align="center">An experimental product design platform where users can collaborate on the final design of a product with the help of AI.</h3>
<br>
<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#built-with">Built With</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#training-the-gan-model">Training the GAN Model</a> •
  <a href="#system-design">System Design</a>
</p>
<br>

![landing page](https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/landing-preview.png)

## Overview

In this project, we exploit the ability of Generative Adversarial Networks (GANs) to generate novel content by integrating them into a collaborative platform where they can assist users in designing their product.

The goal is to explore how the power of GANs as design tools can help revolutionize the design process and see how this combination of deep neural networks and human curation can give artists who are lacking inspiration a place to start from.

![screenshot 1](https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/overview.gif)

## Built With

Main tools and frameworks used:

- [Next.js](https://nextjs.org/) - a React framework
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework
- [HeadlessUI](https://headlessui.com/) - unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS
- [styled-components](https://styled-components.com/) - a CSS-in-JS library
- [Firebase](https://firebase.google.com/) - Google’s Backend-as-a-Service (BaaS)
- [AWS Lambda](https://aws.amazon.com/lambda/) - an event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) - an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale
- [Amazon S3](https://aws.amazon.com/s3/) - an AWS service that provides cloud object storage
- [Google Compute Engine](https://cloud.google.com/compute) - customizable compute service that lets you create and run virtual machines on Google's infrastructure

## How It Works

We cannot train the GAN model on multiple products, so we decided to test the idea on sneakers. The most important part of the platform is the GAN workspace, which can be accessed after the user successfully creates a file inside a project (or a draft file). This is where users can start by generating six design targets, which are shoe images generated by the GAN model and are later used to control the final design. The user can always reshuffle the targets until satisfied with the results.

![screenshot 2](https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/demo-targets.gif)

Once the design targets are present, clicking the generate button will generate an output equidistant from (resembles) all those targets. The output can then be changed by clicking a target, which would steer the final design more towards the selected target.

![screenshot 3](https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/demo-output.gif)

To give users control over which designs to keep as targets and which ones to update, we've added a simple lock feature that locks a target and prevents it from changing when the targets are reshuffled.

<img src="https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/demo-lock-targets.gif" alt="screenshot 4" style="display: block; margin: 0 auto" />

## Training the GAN Model

We trained the StyleGAN2-ADA model (see [official repository](https://github.com/NVlabs/stylegan2-ada-pytorch)) on 9,171 high-quality sneaker images from over 100 brands, manually collected from around the web. The images were then preprocessed using the OpenCV Python library so that all the sneakers are aligned to the center of the image and have a light background.

StyleGAN2-ADA requires at least 1 high-end NVIDIA GPU to run the training; the model was trained on a Google compute engine VM instance with 8 vCPUs, 30GB of RAM, 200GB of persistent disk storage, and 1 NVIDIA V100 GPU. The training was stopped after 5 days at 3000 kimg (FID value: 5.94). Below you can see the final results of training the GAN model.

![training ouput](https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/training-fakes-final.jpg)

After training, the model was tested on Google Colab for variety, details, linear space interpolation, and so on.

## System Design

![system design](https://raw.githubusercontent.com/karamhawili/create-dot-ai/main/assets/system-architecture.png)

The above figure provides an abstract view of the components that make the system work. It consists of three main parts: the frontend, the backend, and the GAN model.

The frontend is a Next.js application where authenticated users can interact with the platform and make various requests and operations.

As opposed to traditional web applications, the backend relies on Firebase—Google’s Backend-as-a-Service (BaaS), and most of the communication with the service happens client-side and is protected by security rules that prevent non-authenticated users from interacting with the database.

Firebase provides three main services that are most important to the system: Firebase Authentication, Cloud Storage, and Cloud Firestore. Users are authenticated using Firebase authentication, and Firestore is used to store and fetch user-generated data related to users, projects, teams, files, and file data. Large files such as images and thumbnails, on the other hand, are stored in Firebase Cloud Storage.

The platform supports real-time updates; therefore, any changes in one file under which a team is collaborating will be visible to all team members instantly.

The GAN model is deployed on Amazon Web Services (AWS) using a serverless architecture consisting of Amazon API Gateway, AWS Lambda, and an AWS S3 storage bucket. Any request to the GAN model will go through the API Gateway, which will trigger AWS Lambda to start. The latter then loads the model from the S3 bucket and runs inference on it. Finally, the output of the generator model is sent back to be visualized by the client and stored inside Firebase’s storage services. However, to be able to adopt this approach, we had to adjust the generator model first to run on a CPU rather than a GPU.
