-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2022 at 09:39 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactuser`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `quantity` int(150) NOT NULL,
  `user` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `name`, `price`, `quantity`, `user`) VALUES
(14, 'Veg momo', '105', 2, 'dear@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'momo'),
(2, 'chowmein'),
(7, 'drinks'),
(8, 'burger'),
(9, 'pizza');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` varchar(100) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `price`, `category`) VALUES
(3, 'Veg momo', '105', 1),
(7, 'Chicken Chowmein', '115', 2),
(11, 'Veg Chowmein', '110', 2),
(12, 'Coke [1.5L]', '135', 7),
(14, 'Chicken Burger', '120', 8),
(15, 'Veg Burger', '105', 8),
(20, 'Buff Burger', '115', 8),
(23, 'Coke [2.5L]', '155', 7),
(24, 'Chicken Pizza [small]', '235', 9),
(26, 'Chicken Pizza [Medium]', '250', 9),
(27, 'Chicken Pizza [Large]', '350', 9),
(28, 'Chicken Momo', '125', 1),
(29, 'Buff Momo', '115', 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `fullname` varchar(155) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` varchar(155) NOT NULL,
  `status` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `fullname`, `email`, `password`, `status`, `token`) VALUES
(3, 'Ashish Thapa', 'thapaashish234@gmail.com', '$2b$10$ECe53qBAqpu5T7cIX1tCtOvs/ZsgNn26HA0GfcvG.NKDmmQfSPnhy', 'active', '5wv8r8p36l7zxsnm'),
(6, 'Ashish Thapa', 'thapaashish23456@gmail.com', '$2b$10$y52S84zMtyvX0j4ec3JYQe2CU10p4XsW44KelFcF0tpH.yLS7zzTa', 'active', 'ey2vdhtswqy34mq0'),
(15, 'Dear Thapa', 'dear@gmail.com', '123456', 'active', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `order-history`
--

CREATE TABLE `order-history` (
  `id` int(11) NOT NULL,
  `foodname` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `quantity` varchar(100) NOT NULL,
  `orderid` varchar(100) NOT NULL,
  `userdelivery` int(11) NOT NULL,
  `loginuser` varchar(150) NOT NULL,
  `orderdate` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order-history`
--

INSERT INTO `order-history` (`id`, `foodname`, `price`, `quantity`, `orderid`, `userdelivery`, `loginuser`, `orderdate`) VALUES
(21, 'Veg Chowmein', '110', '3', '83251cd2-7ebe-4a70-8903-ad6a7af3995f', 8, 'thapaashish234@gmail.com', 'Tue, Jun 15 2021 18:40:44'),
(22, 'Coke [1.5L]', '150', '2', '83251cd2-7ebe-4a70-8903-ad6a7af3995f', 8, 'thapaashish234@gmail.com', 'Tue, Jun 15 2021 18:40:44'),
(23, 'Chicken Pizza [small]', '235', '2', '83251cd2-7ebe-4a70-8903-ad6a7af3995f', 8, 'thapaashish234@gmail.com', 'Tue, Jun 15 2021 18:40:44'),
(24, 'Chicken Chowmein', '115', '3', '83251cd2-7ebe-4a70-8903-ad6a7af3995f', 8, 'thapaashish234@gmail.com', 'Tue, Jun 15 2021 18:40:44'),
(25, 'Veg momo', '105', '1', '2afdde81-4e8b-4aeb-b086-c5bb42ef7adf', 10, 'thapaashish234@gmail.com', 'Tue, Jun 15 2021 18:48:12'),
(26, 'Chicken Pizza [Large]', '350', '1', 'c6fefa0b-09c2-4523-b6d8-5dabf37c0b18', 8, 'thapaashish234@gmail.com', 'Tue, Jun 15 2021 18:48:23'),
(27, 'Chicken Chowmein', '115', '2', '45e45ab1-3617-4263-9e90-cd3e2b515836', 12, 'thapaashish23456@gmail.com', 'Tue, Jun 15 2021 21:55:40'),
(28, 'Chicken Pizza [Large]', '350', '1', '45e45ab1-3617-4263-9e90-cd3e2b515836', 12, 'thapaashish23456@gmail.com', 'Tue, Jun 15 2021 21:55:40'),
(29, 'Coke [2.5L]', '175', '2', '45e45ab1-3617-4263-9e90-cd3e2b515836', 12, 'thapaashish23456@gmail.com', 'Tue, Jun 15 2021 21:55:40'),
(30, 'Chicken Chowmein', '115', '2', '3d76aa28-ba03-4824-b08d-c185d7a4a557', 8, 'thapaashish234@gmail.com', 'Wed, Jun 16 2021 16:32:58'),
(31, 'Veg momo', '105', '2', '3d76aa28-ba03-4824-b08d-c185d7a4a557', 8, 'thapaashish234@gmail.com', 'Wed, Jun 16 2021 16:32:58'),
(32, 'Chicken Pizza [Medium]', '250', '1', '3d76aa28-ba03-4824-b08d-c185d7a4a557', 8, 'thapaashish234@gmail.com', 'Wed, Jun 16 2021 16:32:58'),
(33, 'Coke [2.5L]', '175', '1', '3d76aa28-ba03-4824-b08d-c185d7a4a557', 8, 'thapaashish234@gmail.com', 'Wed, Jun 16 2021 16:32:58'),
(34, 'Veg momo', '105', '1', '3917742e-c4c4-474c-9f35-41d3bd70c177', 10, 'thapaashish234@gmail.com', 'Thu, Nov 04 2021 23:04:18');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `orderid` varchar(155) NOT NULL,
  `loginuser` varchar(120) NOT NULL,
  `orderdate` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `contact`, `message`) VALUES
(24, 'Ashish Thapa', 'thapaashish234@gmail.com', '9805892471', 'Testing'),
(43, 'Dear Thapa', 'dear@gmail.com', '9815138321', 'Testing'),
(44, 'Padam Thapa', 'padam@gmail.com', '9846055089', 'Welcome!!! Finally, it\'s done:)');

-- --------------------------------------------------------

--
-- Table structure for table `userdeliverform`
--

CREATE TABLE `userdeliverform` (
  `id` int(11) NOT NULL,
  `fullname` varchar(155) NOT NULL,
  `address` varchar(155) NOT NULL,
  `contact` varchar(155) NOT NULL,
  `contact2` varchar(155) NOT NULL,
  `email` varchar(155) NOT NULL,
  `loginemail` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdeliverform`
--

INSERT INTO `userdeliverform` (`id`, `fullname`, `address`, `contact`, `contact2`, `email`, `loginemail`) VALUES
(8, 'Ashish Thapa', 'POKHARA-10', '9805892471', '', 'thapaashish234@gmail.com', 'thapaashish234@gmail.com'),
(9, 'Ashish Thapa', 'POKHARA-15', '9805892471', '', 'thapaashish234@gmail.com', 'dear@gmail.com'),
(10, 'Dear Thapa', 'POKHARA-15', '9805892471', '9815138321', 'thapaashish234@gmail.com', 'thapaashish234@gmail.com'),
(11, 'Dear Thapa', 'dear@gmail.com', '9815138921', '', 'dear123@gmail.com', 'thapaashish23456@gmail.com'),
(12, 'Ashim Thapa', 'POKHARA-10', '9846055089', '', 'ashim123@gmail.com', 'thapaashish23456@gmail.com'),
(13, 'Akash Thapa', 'Amarsingh Chok', '9846055089', '', 'akash@gmail.com', 'thapaashish234@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `userorder`
--

CREATE TABLE `userorder` (
  `id` int(11) NOT NULL,
  `orderdate` varchar(100) NOT NULL,
  `orderid` varchar(155) NOT NULL,
  `foodname` varchar(155) NOT NULL,
  `price` varchar(155) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `loginuser` varchar(155) NOT NULL,
  `userdelivery` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order-history`
--
ALTER TABLE `order-history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdeliverform`
--
ALTER TABLE `userdeliverform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userorder`
--
ALTER TABLE `userorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userdelivery` (`userdelivery`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order-history`
--
ALTER TABLE `order-history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `userdeliverform`
--
ALTER TABLE `userdeliverform`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `userorder`
--
ALTER TABLE `userorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `userorder`
--
ALTER TABLE `userorder`
  ADD CONSTRAINT `userorder_ibfk_1` FOREIGN KEY (`userdelivery`) REFERENCES `userdeliverform` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
