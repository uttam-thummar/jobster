import Job from '../models/Job.model.js'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import mongoose from 'mongoose';
import moment from 'moment';

const getAllJobs = async (req, res) => {
    const { search, status, jobType, sort } = req.query;
    const queryObject = {
        createdBy: req.user.id
    }
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' };
    }
    if (status && status !== 'all') {
        queryObject.status = status;
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }
    let result = Job.find(queryObject);

    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('company');
    }
    if (sort === 'a-z') {
        result = result.sort('-company');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const jobs = await result;
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    return res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
}

const getJob = async (req, res) => {
    const {
        user: { id: userId },
        params: { id: jobId }
    } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    return res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.id;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
    const {
        user: { id: userId },
        params: { id: jobId },
        body: { company, position }
    } = req;

    if (company === '' || position === '') {
        throw new BadRequestError("Company or Position field cannot be empty");
    }
    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    return res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
    const {
        user: { id: userId },
        params: { id: jobId }
    } = req;

    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    return res.status(StatusCodes.OK).json({ success: true, msg: 'Success! Job removed' });
}

const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 },
    ]);

    monthlyApplications = monthlyApplications.map((item) => {
        const {
            _id: { year, month },
            count,
        } = item;
        const date = moment()
            .month(month - 1)
            .year(year)
            .format('MMM Y');
        return { date, count };
    });

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob, showStats };