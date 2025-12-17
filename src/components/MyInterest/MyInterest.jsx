import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const [interest, setInterest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterest = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch(`http://localhost:3000/interest?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch interests');
        }

        const data = await res.json();
        setInterest(data);
      } catch (err) {
        console.error(err);
        setInterest([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterest();
  }, [user?.email]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'accepted':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: CheckCircleIcon, label: 'Accepted' };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: XCircleIcon, label: 'Rejected' };
      default:
        return { bg: 'bg-amber-100', text: 'text-amber-800', icon: ClockIcon, label: 'Pending' };
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const rowVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  console.log(interest);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
            My Interests
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Track all the crop purchase interests you've sent
          </p>
        </motion.div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-16 w-16 border-t-4 border-emerald-600 border-solid"
              />
            </motion.div>
          ) : interest.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-16 text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Interests Yet</h3>
              <p className="text-lg text-gray-500">
                You haven't sent any interest requests. Start exploring crops!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 to-green-700 text-white">
                      <th className="py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider">#</th>
                      <th className="py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider">Crop Name</th>
                      <th className="py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider">Seller</th>
                      <th className="py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider">Quantity</th>
                      <th className="py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider">Message</th>
                      <th className="py-5 px-6 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {interest.map((item, idx) => {
                      const statusConfig = getStatusConfig(item.status);
                      const StatusIcon = statusConfig.icon;

                      return (
                        <motion.tr
                          key={item._id}
                          variants={rowVariant}
                          whileHover={{ backgroundColor: '#f0fdf4', scale: 1.01, transition: { duration: 0.2 } }}
                          className="transition-all duration-300"
                        >
                          <td className="py-5 px-6 text-gray-700 font-medium">{idx + 1}</td>
                          <td className="py-5 px-6"><span className="font-bold text-gray-900">  <Link
                            to={`/card/${item.cropId}`}
                            className="font-bold text-emerald-700 hover:underline hover:text-emerald-900 transition"
                          >
                            {item.product}
                          </Link></span></td>
                          <td className="py-5 px-6 text-gray-700">{item.ownerName}</td>
                          <td className="py-5 px-6 text-gray-700">{item.quantity} {item.unit || ''}</td>
                          <td className="py-5 px-6 text-gray-600 italic max-w-xs">{item.message || <span className="text-gray-400">—</span>}</td>
                          <td className="py-5 px-6">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.text} font-semibold`}>
                              <StatusIcon className="w-5 h-5" />
                              {statusConfig.label}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyInterest;
